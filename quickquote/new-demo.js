#!/usr/bin/env node
// Make a personalized demo for a real business, plus the message to send them.
//
//   node new-demo.js "Joe's Pressure Washing" pressure-washing "Tampa, FL" --phone "(813) 555-0100"
//
// Options: --phone, --color "#hex", --webhook <url for their lead alerts>, --slug, --force

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_URL = (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, '');
const trades = fs.readdirSync(path.join(ROOT, 'trades')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));

const flags = {};
const pos = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const key = argv[i].slice(2);
    flags[key] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  } else pos.push(argv[i]);
}

const [name, trade, city = ''] = pos;
if (!name || !trades.includes(trade)) {
  console.error(`usage: node new-demo.js "Business Name" <trade> "City, ST" [--phone "(555) 555-0100"] [--color "#0f766e"] [--webhook URL]
trades: ${trades.join(', ')}`);
  process.exit(1);
}

const slug = String(flags.slug || name).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
if (!slug) { console.error('could not make a URL slug from that name; pass --slug'); process.exit(1); }

const file = path.join(ROOT, 'businesses', `${slug}.json`);
if (fs.existsSync(file) && !flags.force) {
  console.error(`${slug} already exists (${path.relative(process.cwd(), file)}). Use --force to overwrite.`);
  process.exit(1);
}

// a strong, readable accent if none given, picked from the name so it's stable
const PALETTE = ['#0f766e', '#1d4ed8', '#7c3aed', '#be123c', '#c2410c', '#15803d', '#0369a1', '#4338ca'];
const hash = [...slug].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
const accent = /^#[0-9a-f]{3,8}$/i.test(flags.color || '') ? flags.color : PALETTE[hash % PALETTE.length];

const biz = { name, trade, city, phone: typeof flags.phone === 'string' ? flags.phone : '', color: accent };
if (typeof flags.webhook === 'string') biz.notify = { webhook: flags.webhook };
fs.writeFileSync(file, JSON.stringify(biz, null, 2) + '\n');

const label = JSON.parse(fs.readFileSync(path.join(ROOT, 'trades', `${trade}.json`), 'utf8')).label.toLowerCase();
const demo = `${PUBLIC_URL}/demo/${slug}`;

console.log(`
Demo ready:  ${demo}
Config:      ${path.relative(process.cwd(), file)}   (edit prices here under "quote" once they say yes)

Embed code for their site:
  <div data-quickquote></div>
  <script src="${PUBLIC_URL}/widget.js" data-business="${slug}" async></script>

Message to send (email, Facebook, Instagram DM or text):
------------------------------------------------------------
Hi! I built ${name} an instant-quote calculator for your website. Here's a working demo with your name on it:
${demo}

Customers pick what they need, see a ${label} price in seconds, and their name and number go straight to your phone.
It has sample prices right now; I'd set it up with yours.

Want it on your site? It's free for 14 days. If it doesn't bring you a real lead, you don't pay anything.
------------------------------------------------------------`);
if (/localhost|127\.0\.0\.1/.test(PUBLIC_URL)) {
  console.log('\nNote: this link only works on your machine. Deploy first and set PUBLIC_URL so the link works for them (see README).');
}
