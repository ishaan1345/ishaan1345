#!/usr/bin/env node
// QuickQuote server. Zero dependencies — `node server.js`.
//
//   GET  /                 sales page for business owners
//   GET  /demo/:slug       personalized demo site for one business (send this link)
//   GET  /widget.js        the embeddable calculator
//   GET  /api/config/:slug public pricing config for one business
//   POST /api/lead/:slug   a visitor asks for their quote → saved + owner alerted
//   GET  /leads?key=…      every lead, for you (needs ADMIN_KEY)
//
// Env: PORT, PUBLIC_URL, ADMIN_KEY, LEAD_WEBHOOK_URL, CONTACT_EMAIL, DATA_DIR

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { computeQuote, describe, normalize } from './pricing.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const WEBHOOK = process.env.LEAD_WEBHOOK_URL || '';
const CONTACT = process.env.CONTACT_EMAIL || '';
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const LEADS = path.join(DATA_DIR, 'leads.jsonl');
fs.mkdirSync(DATA_DIR, { recursive: true });

// widget.js = pricing engine + widget, wrapped so nothing leaks into the host page
const WIDGET = '(() => {\n' +
  fs.readFileSync(path.join(ROOT, 'pricing.js'), 'utf8').replace(/^export /gm, '') + '\n' +
  fs.readFileSync(path.join(ROOT, 'public', 'widget.js'), 'utf8') + '\n})();\n';

// ------------------------------------------------------------------ data

const SLUG = /^[a-z0-9][a-z0-9-]{0,59}$/;
const readJSON = (p) => { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } };

function loadBusiness(slug) {
  if (!SLUG.test(slug)) return null;
  const biz = readJSON(path.join(ROOT, 'businesses', `${slug}.json`));
  const trade = biz && readJSON(path.join(ROOT, 'trades', `${biz.trade}.json`));
  if (!trade) return null;
  // a business can override any part of its trade template (e.g. its own prices)
  return { ...biz, slug, quote: { ...trade, ...(biz.quote || {}) } };
}

function publicConfig(biz) {
  const { notify, ...rest } = biz; // never expose the owner's alert webhook
  return rest;
}

function readLeads() {
  if (!fs.existsSync(LEADS)) return [];
  return fs.readFileSync(LEADS, 'utf8').split('\n').filter(Boolean).flatMap((l) => {
    try { return [JSON.parse(l)]; } catch { return []; }
  });
}

// ------------------------------------------------------------------ helpers

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const color = (c) => (/^#[0-9a-f]{3,8}$/i.test(c || '') ? c : '#2563eb');
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type' };

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'x-content-type-options': 'nosniff', ...headers });
  res.end(body);
}
const json = (res, status, obj) => send(res, status, JSON.stringify(obj), { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS });
const html = (res, body, status = 200) => send(res, status, body, { 'content-type': 'text/html; charset=utf-8' });

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('too large')); req.destroy(); } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const hits = new Map(); // ip -> recent lead timestamps
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

function sameKey(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// ------------------------------------------------------------------ leads

async function handleLead(req, res, slug) {
  const biz = loadBusiness(slug);
  if (!biz) return json(res, 404, { error: 'Unknown business.' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (rateLimited(ip)) return json(res, 429, { error: 'Too many requests. Please try again in a few minutes.' });

  let body;
  try { body = JSON.parse(await readBody(req, 16_384)); } catch { return json(res, 400, { error: 'Bad request.' }); }
  if (!body || typeof body !== 'object') return json(res, 400, { error: 'Bad request.' });

  const answers = normalize(biz.quote, body.answers);
  const quote = computeQuote(biz.quote, answers);
  if (str(body.website, 200)) return json(res, 200, { ok: true, ...quote }); // honeypot: bots get a fake success

  const lead = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    business: slug,
    name: str(body.name, 100),
    phone: str(body.phone, 40),
    zip: str(body.zip, 20),
    notes: str(body.notes, 1000),
    summary: describe(biz.quote, answers),
    low: quote.low,
    high: quote.high,
    answers,
  };
  if (!lead.name) return json(res, 400, { error: 'Please add your name.' });
  if ((lead.phone.match(/\d/g) || []).length < 7) return json(res, 400, { error: 'Please add a phone number we can text.' });

  fs.appendFileSync(LEADS, JSON.stringify(lead) + '\n');
  console.log(`lead  ${slug}  ${lead.name}  ${lead.phone}  ${money(lead.low)}–${money(lead.high)}`);
  notify(biz, lead).catch((e) => console.error(`alert failed for ${slug}: ${e.message}`));
  return json(res, 200, { ok: true, low: quote.low, high: quote.high });
}

// Alert the owner. Works with Slack/Discord webhooks, Zapier/Make (→ SMS), or an ntfy.sh topic (free phone push).
async function notify(biz, lead) {
  const targets = [...new Set([biz.notify?.webhook, WEBHOOK].filter(Boolean))];
  const text = `New quote request for ${biz.name}: ${lead.name}, ${lead.phone}. ` +
    `${money(lead.low)}–${money(lead.high)}${biz.quote.per ? ' ' + biz.quote.per : ''} (${lead.summary})` +
    `${lead.zip ? `, ZIP ${lead.zip}` : ''}${lead.notes ? `. Note: "${lead.notes}"` : ''}`;
  await Promise.all(targets.map(async (url) => {
    const r = /^https:\/\/ntfy\.sh\//.test(url)
      ? await fetch(url, { method: 'POST', body: text, headers: { Title: `New lead: ${lead.name}`.replace(/[^\x20-\x7e]/g, '') } })
      : await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, content: text, lead }) });
    if (!r.ok) throw new Error(`${new URL(url).host} answered ${r.status}`);
  }));
}

// ------------------------------------------------------------------ pages

const BASE_CSS = `
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#111827;background:#fff}
a{color:inherit}.wrap{max-width:1080px;margin:0 auto;padding:0 16px}
`;

function page(title, body, extraCss = '') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${BASE_CSS}${extraCss}</style></head><body>${body}</body></html>`;
}

function demoPage(biz) {
  const c = color(biz.color);
  const q = biz.quote;
  const hero = (q.hero || `${q.label} in {city}`).replace(' in {city}', biz.city ? ` in ${biz.city}` : '').replace('{city}', biz.city || '');
  const tel = (biz.phone || '').replace(/[^\d+]/g, '');
  return page(`${biz.name} — instant quote demo`, `
<div class="banner"><div class="wrap">
  <strong>Built for ${esc(biz.name)}${/[.!?]$/.test(biz.name) ? '' : '.'}</strong> This is a working demo of an instant-quote calculator for your website.
  Try it: customers see a price in seconds, and their name and number come straight to your phone. Sample prices; you set your own.
</div></div>
<header><div class="wrap bar">
  <div class="logo">${esc(biz.name)}</div>
  ${biz.phone ? `<a class="call" href="tel:${esc(tel)}">Call ${esc(biz.phone)}</a>` : ''}
</div></header>
<main class="wrap hero">
  <section class="pitch">
    <p class="eyebrow">${esc(q.label || '')}${biz.city ? ` · ${esc(biz.city)}` : ''}</p>
    <h1>${esc(hero)}</h1>
    <ul>${(q.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </section>
  <section class="calc"><div data-quickquote="${esc(biz.slug)}"></div></section>
</main>
<footer class="wrap">© ${new Date().getFullYear()} ${esc(biz.name)}</footer>
<script src="/widget.js" data-business="${esc(biz.slug)}" async></script>`, `
:root{--c:${c}}
.banner{background:#111827;color:#f9fafb;font-size:14px;padding:12px 0}
.banner strong{color:#fff}
header{border-bottom:1px solid #e5e7eb}
.bar{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:64px;flex-wrap:wrap;padding-top:8px;padding-bottom:8px}
.logo{font-weight:800;font-size:20px;color:var(--c);letter-spacing:-.01em}
.call{background:var(--c);color:#fff;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:999px;font-size:15px;white-space:nowrap}
.hero{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;padding-top:48px;padding-bottom:48px}
.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:13px;font-weight:700;color:var(--c);margin:0 0 8px}
h1{font-size:44px;line-height:1.1;margin:0 0 20px;letter-spacing:-.02em}
ul{padding:0;margin:0;list-style:none}
li{padding:8px 0 8px 30px;position:relative;font-size:17px}
li:before{content:"✓";position:absolute;left:0;top:7px;width:22px;height:22px;border-radius:50%;background:var(--c);color:#fff;font-size:13px;display:grid;place-items:center}
footer{color:#6b7280;font-size:14px;padding-top:24px;padding-bottom:40px;border-top:1px solid #e5e7eb}
@media (max-width:820px){.hero{grid-template-columns:1fr;gap:28px;padding-top:28px}h1{font-size:32px}}
`);
}

function landingPage() {
  return page('QuickQuote — instant prices on your website', `
<main class="wrap">
  <section class="top">
    <h1>Most visitors won't call for a quote.<br>They will tap a button.</h1>
    <p class="lead">QuickQuote puts a price calculator on your website. Customers pick what they need, see a price in seconds,
      and leave their number. You get a text with the job details before they've even closed the tab.</p>
    ${CONTACT ? `<a class="btn" href="mailto:${esc(CONTACT)}?subject=QuickQuote%20for%20my%20business">Get it on your site</a>` : ''}
  </section>
  <section class="grid">
    <div><h2>How it works</h2>
      <ol><li>Tell us your services and prices. We set it up for you.</li>
      <li>Paste one line of code on your site, or we do it for you.</li>
      <li>Customers get a price instantly. You get their name, number and job details.</li></ol>
      <h2>Pricing</h2><p>Free for 14 days. If it doesn't bring you a real lead, you pay nothing.</p>
    </div>
    <div><h2>Try it</h2><div data-quickquote="demo-cleaning"></div></div>
  </section>
</main>
<script src="/widget.js" data-business="demo-cleaning" async></script>`, `
.top{padding:56px 0 32px;max-width:760px}
h1{font-size:44px;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px}
.lead{font-size:19px;color:#374151;margin:0 0 24px}
.btn{display:inline-block;background:#111827;color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:12px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:24px 0 64px}
h2{font-size:20px;margin:0 0 10px}ol{padding-left:20px;margin:0 0 28px}li{margin:0 0 8px}
@media (max-width:820px){.grid{grid-template-columns:1fr}h1{font-size:32px}}
`);
}

function leadsPage(url) {
  if (!ADMIN_KEY) return [403, page('Leads', '<main class="wrap"><p>Set the ADMIN_KEY environment variable to see leads here.</p></main>')];
  if (!sameKey(url.searchParams.get('key') || '', ADMIN_KEY)) return [401, page('Leads', '<main class="wrap"><p>Wrong or missing key.</p></main>')];
  const only = url.searchParams.get('b');
  const leads = readLeads().filter((l) => !only || l.business === only).reverse();
  const rows = leads.map((l) => `<tr>
    <td>${esc(new Date(l.at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }))}</td>
    <td>${esc(l.business)}</td><td><strong>${esc(l.name)}</strong></td>
    <td><a href="sms:${esc(l.phone.replace(/[^\d+]/g, ''))}">${esc(l.phone)}</a></td>
    <td>${money(l.low)}–${money(l.high)}</td><td>${esc(l.summary)}</td><td>${esc(l.zip)}</td><td>${esc(l.notes)}</td></tr>`).join('');
  return [200, page('Leads', `<main class="wrap"><h1>Leads (${leads.length})</h1>
    <div class="scroll"><table><thead><tr><th>When</th><th>Business</th><th>Name</th><th>Phone</th><th>Estimate</th><th>Job</th><th>ZIP</th><th>Notes</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="8">No leads yet.</td></tr>'}</tbody></table></div></main>`, `
    h1{font-size:24px;margin:24px 0 16px}.scroll{overflow-x:auto}
    table{border-collapse:collapse;width:100%;font-size:14px}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e5e7eb;vertical-align:top}
    th{background:#f9fafb;white-space:nowrap}td:nth-child(5){white-space:nowrap;font-variant-numeric:tabular-nums}`)];
}

const notFound = () => page('Not found', '<main class="wrap"><h1>Not found</h1></main>');

// ------------------------------------------------------------------ routes

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  let m;
  try {
    if (req.method === 'OPTIONS' && p.startsWith('/api/')) return send(res, 204, '', CORS);
    if (req.method === 'GET' && p === '/') return html(res, landingPage());
    if (req.method === 'GET' && p === '/health') return json(res, 200, { ok: true });
    if (req.method === 'GET' && p === '/widget.js') {
      return send(res, 200, WIDGET, { 'content-type': 'application/javascript; charset=utf-8', 'cache-control': 'public, max-age=300', ...CORS });
    }
    if (req.method === 'GET' && (m = p.match(/^\/api\/config\/([^/]+)$/))) {
      const biz = loadBusiness(decodeURIComponent(m[1]));
      return biz ? json(res, 200, publicConfig(biz)) : json(res, 404, { error: 'Unknown business.' });
    }
    if (req.method === 'POST' && (m = p.match(/^\/api\/lead\/([^/]+)$/))) return await handleLead(req, res, decodeURIComponent(m[1]));
    if (req.method === 'GET' && (m = p.match(/^\/demo\/([^/]+)\/?$/))) {
      const biz = loadBusiness(decodeURIComponent(m[1]));
      return biz ? html(res, demoPage(biz)) : html(res, notFound(), 404);
    }
    if (req.method === 'GET' && p === '/leads') {
      const [status, body] = leadsPage(url);
      return html(res, body, status);
    }
    return html(res, notFound(), 404);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) json(res, 500, { error: 'Server error.' });
  }
});

server.listen(PORT, () => {
  console.log(`QuickQuote running on http://localhost:${PORT}`);
  console.log(`  sample demo: http://localhost:${PORT}/demo/demo-cleaning`);
  if (!ADMIN_KEY) console.log('  (set ADMIN_KEY to view leads at /leads?key=…)');
});
