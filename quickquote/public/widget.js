// QuickQuote embeddable widget.
//   <div data-quickquote></div>
//   <script src="https://YOUR-HOST/widget.js" data-business="your-slug" async></script>
// The server prepends pricing.js (normalize, computeQuote) and wraps it all in an IIFE.

const script = document.currentScript;
const slug = script && script.dataset.business;
const base = script ? new URL(script.src, location.href).origin : '';

const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const safeColor = (c) => (/^#[0-9a-f]{3,8}$/i.test(c || '') ? c : '#2563eb');

function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) {
    if (k == null || k === false) continue;
    e.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return e;
}

const STYLES = `
:host { all: initial; display: block; }
.qq { font: 15px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #111827; background: #fff;
  border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px; max-width: 520px; box-shadow: 0 10px 30px rgba(0,0,0,.08); }
.qq * { box-sizing: border-box; }
h2 { margin: 0 0 4px; font-size: 20px; line-height: 1.25; }
.sub { margin: 0 0 18px; color: #6b7280; font-size: 14px; }
fieldset { border: 0; padding: 0; margin: 0 0 16px; min-width: 0; }
legend { font-weight: 600; font-size: 14px; margin: 0 0 8px; padding: 0; }
.pills { display: flex; flex-wrap: wrap; gap: 6px; }
.pill { font: inherit; font-size: 14px; border: 1px solid #d1d5db; background: #fff; color: #111827; border-radius: 999px;
  padding: 8px 14px; min-height: 40px; cursor: pointer; transition: background .12s, border-color .12s; text-align: left; }
.pill:hover { border-color: var(--accent); }
.pill[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: #fff; }
.pill small { display: block; font-size: 11px; opacity: .85; }
.stepper { display: flex; align-items: center; gap: 10px; }
.stepper button { width: 40px; height: 40px; border-radius: 10px; border: 1px solid #d1d5db; background: #fff; color: #111827;
  font: 600 20px/1 system-ui, sans-serif; cursor: pointer; }
.stepper button:hover { border-color: var(--accent); }
.stepper output { min-width: 90px; text-align: center; font-weight: 700; }
.total { margin: 6px 0 14px; padding: 14px 16px; border-radius: 12px; background: #f3f4f6; }
.total span { display: block; font-size: 13px; color: #6b7280; }
.price { font-size: 28px; font-weight: 800; color: var(--accent); letter-spacing: -0.01em; }
.per { font-size: 14px; font-weight: 600; color: #6b7280; }
.cta { width: 100%; font: inherit; font-weight: 700; font-size: 16px; padding: 14px; border: 0; border-radius: 12px;
  background: var(--accent); color: #fff; cursor: pointer; }
.cta:disabled { opacity: .6; cursor: wait; }
.link { background: none; border: 0; color: #6b7280; font: inherit; font-size: 14px; cursor: pointer; padding: 10px 0 0; text-decoration: underline; }
label { display: block; font-size: 14px; font-weight: 600; margin: 0 0 4px; }
input, textarea { display: block; font: inherit; width: 100%; padding: 11px 12px; border: 1px solid #d1d5db; border-radius: 10px;
  margin: 0 0 12px; color: #111827; background: #fff; }
input:focus, textarea:focus, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.fine { font-size: 12px; color: #6b7280; margin: 10px 0 0; }
.err { color: #b91c1c; font-size: 14px; margin: 0 0 10px; }
.done { text-align: center; padding: 10px 0; }
.done .check { width: 48px; height: 48px; border-radius: 50%; background: var(--accent); color: #fff; display: grid;
  place-items: center; margin: 0 auto 10px; font-size: 26px; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
`;

function initialAnswers(q) {
  const a = {};
  for (const item of q.questions) {
    if (item.type === 'choice') a[item.id] = item.options[0].value;
    else if (item.type === 'number') a[item.id] = item.default ?? item.min ?? 0;
    else a[item.id] = [];
  }
  return a;
}

function choiceField(item, answers, onChange) {
  const btns = item.options.map((o) =>
    el('button', {
      type: 'button',
      class: 'pill',
      'aria-pressed': String(answers[item.id] === o.value),
      onclick: () => {
        answers[item.id] = o.value;
        btns.forEach((b, i) => b.setAttribute('aria-pressed', String(item.options[i].value === o.value)));
        onChange();
      },
    }, o.label, o.note ? el('small', {}, o.note) : null),
  );
  return el('fieldset', {}, el('legend', {}, item.label), el('div', { class: 'pills' }, btns));
}

function multiField(item, answers, onChange) {
  const btns = item.options.map((o) => {
    const b = el('button', {
      type: 'button',
      class: 'pill',
      'aria-pressed': 'false',
      onclick: () => {
        const set = new Set(answers[item.id]);
        set.has(o.value) ? set.delete(o.value) : set.add(o.value);
        answers[item.id] = [...set];
        b.setAttribute('aria-pressed', String(set.has(o.value)));
        onChange();
      },
    }, o.label);
    return b;
  });
  return el('fieldset', {}, el('legend', {}, item.label), el('div', { class: 'pills' }, btns));
}

function numberField(item, answers, onChange) {
  const min = item.min ?? 0;
  const max = item.max ?? 99;
  const step = item.step ?? 1;
  const fmt = (n) => `${n.toLocaleString('en-US')}${item.unit ? ' ' + item.unit : ''}`;
  const out = el('output', { 'aria-live': 'polite' }, fmt(answers[item.id]));
  const set = (v) => {
    answers[item.id] = Math.min(max, Math.max(min, v));
    out.textContent = fmt(answers[item.id]);
    onChange();
  };
  return el('fieldset', {}, el('legend', {}, item.label),
    el('div', { class: 'stepper' },
      el('button', { type: 'button', 'aria-label': `Less: ${item.label}`, onclick: () => set(answers[item.id] - step) }, '−'),
      out,
      el('button', { type: 'button', 'aria-label': `More: ${item.label}`, onclick: () => set(answers[item.id] + step) }, '+'),
    ));
}

function render(root, cfg) {
  const q = cfg.quote;
  const answers = initialAnswers(q);
  const card = el('div', { class: 'qq', style: `--accent: ${safeColor(cfg.color)}` });
  root.replaceChildren(el('style', {}, STYLES), card);

  const priceEl = el('div', { class: 'price' });
  const fmtRange = (r) => (r.low === r.high ? money(r.low) : `${money(r.low)} – ${money(r.high)}`);
  const update = () => {
    const parts = [fmtRange(computeQuote(q, answers))];
    if (q.per) parts.push(el('span', { class: 'per' }, ' ' + q.per));
    priceEl.replaceChildren(...parts);
  };

  const fieldFor = { choice: choiceField, multi: multiField, number: numberField };
  const quoteStep = () => [
    el('h2', {}, q.title || 'Get your price in 30 seconds'),
    el('p', { class: 'sub' }, q.subtitle || `Pick what you need and see your price from ${cfg.name} instantly.`),
    ...q.questions.map((item) => fieldFor[item.type](item, answers, update)),
    el('div', { class: 'total', 'aria-live': 'polite' }, el('span', {}, 'Your estimate'), priceEl),
    el('button', { type: 'button', class: 'cta', onclick: () => show(contactStep()) }, q.cta || 'Lock in this price'),
    el('p', { class: 'fine' }, q.disclaimer || 'Estimate only. Final price confirmed before any work starts.'),
  ];

  const contactStep = () => {
    const err = el('p', { class: 'err', role: 'alert', hidden: true });
    const input = (name, label, type = 'text', extra = {}) => [
      el('label', { for: `qq-${name}` }, label),
      el(type === 'textarea' ? 'textarea' : 'input', { id: `qq-${name}`, name, type: type === 'textarea' ? null : type, rows: type === 'textarea' ? 2 : null, ...extra }),
    ];
    const form = el('form', { novalidate: true },
      ...input('name', 'Your name', 'text', { autocomplete: 'name', required: true }),
      ...input('phone', 'Mobile number', 'tel', { autocomplete: 'tel', required: true, inputmode: 'tel' }),
      ...input('zip', 'ZIP code', 'text', { autocomplete: 'postal-code', inputmode: 'numeric' }),
      ...input('notes', 'Anything we should know? (optional)', 'textarea'),
      el('div', { class: 'hp', 'aria-hidden': 'true' }, el('input', { name: 'website', tabindex: '-1', autocomplete: 'off' })),
      err,
      el('button', { type: 'submit', class: 'cta' }, `Send to ${cfg.name}`),
    );
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const btn = form.querySelector('button[type=submit]');
      const problem = !String(data.name || '').trim() ? 'Please add your name.'
        : (String(data.phone || '').match(/\d/g) || []).length < 7 ? 'Please add a phone number we can text.' : '';
      if (problem) {
        err.textContent = problem;
        err.hidden = false;
        return;
      }
      btn.disabled = true;
      err.hidden = true;
      try {
        const r = await fetch(`${base}/api/lead/${encodeURIComponent(cfg.slug)}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, answers }),
        });
        const body = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(body.error || 'Something went wrong. Please call us instead.');
        const first = String(data.name || '').trim().split(/\s+/)[0];
        show([
          el('div', { class: 'done' },
            el('div', { class: 'check', 'aria-hidden': 'true' }, '✓'),
            el('h2', {}, `Got it${first ? ', ' + first : ''}!`),
            el('p', { class: 'sub' }, `${cfg.name} will text you shortly to confirm your price of ${fmtRange(body)}${q.per ? ' ' + q.per : ''}.`),
          ),
        ]);
      } catch (ex) {
        err.textContent = ex.message;
        err.hidden = false;
        btn.disabled = false;
      }
    });
    return [
      el('h2', {}, 'Where should we send your quote?'),
      el('div', { class: 'total' }, el('span', {}, 'Your estimate'), priceEl),
      form,
      el('button', { type: 'button', class: 'link', onclick: () => show(quoteStep()) }, '← Change my answers'),
    ];
  };

  function show(nodes) {
    card.replaceChildren(...nodes);
    update();
  }
  show(quoteStep());
}

async function boot() {
  if (!slug) return console.warn('QuickQuote: add data-business="your-slug" to the script tag');
  let host = document.querySelector(`[data-quickquote="${CSS_escape(slug)}"]`) ||
    document.querySelector('[data-quickquote]:not([data-qq-mounted])');
  if (!host) {
    host = document.createElement('div');
    script.after(host);
  }
  host.setAttribute('data-qq-mounted', '');
  const root = host.shadowRoot || host.attachShadow({ mode: 'open' });
  try {
    const r = await fetch(`${base}/api/config/${encodeURIComponent(slug)}`);
    if (!r.ok) throw new Error(String(r.status));
    render(root, await r.json());
  } catch {
    root.replaceChildren(el('p', {}, 'The quote calculator is unavailable right now. Please call us for a price.'));
  }
}

function CSS_escape(s) {
  return window.CSS && window.CSS.escape ? window.CSS.escape(s) : String(s).replace(/["\\]/g, '\\$&');
}

boot();
