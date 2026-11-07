// Pricing engine shared by the server and the embeddable widget.
// The server inlines this file into /widget.js, so keep it dependency-free.
//
// Question types:
//   choice  options: [{ value, label, add?, mult?, discount?, note? }]  (pick one)
//   number  { min, max, step, default, price, free?, unit? }             (stepper)
//   multi   options: [{ value, label, add }]                             (pick any)
//
// total = (sum of adds) * (product of mults) * (1 - biggest discount),
// floored at quote.minimum, shown as a range of +/- quote.spread.

export function normalize(quote, raw) {
  const answers = {};
  const input = raw && typeof raw === 'object' ? raw : {};
  for (const q of quote.questions) {
    const a = input[q.id];
    if (q.type === 'choice') {
      answers[q.id] = (q.options.find((o) => o.value === a) || q.options[0]).value;
    } else if (q.type === 'number') {
      const min = q.min ?? 0;
      const max = q.max ?? 1e6;
      const n = Number(a ?? q.default ?? min);
      answers[q.id] = Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : q.default ?? min;
    } else if (q.type === 'multi') {
      const picked = Array.isArray(a) ? a : [];
      answers[q.id] = q.options.filter((o) => picked.includes(o.value)).map((o) => o.value);
    }
  }
  return answers;
}

export function computeQuote(quote, raw) {
  const answers = normalize(quote, raw);
  let add = 0;
  let mult = 1;
  let discount = 0;
  for (const q of quote.questions) {
    const a = answers[q.id];
    if (q.type === 'choice') {
      const o = q.options.find((x) => x.value === a);
      add += o.add || 0;
      mult *= o.mult || 1;
      discount = Math.max(discount, o.discount || 0);
    } else if (q.type === 'number') {
      add += Math.max(0, a - (q.free || 0)) * (q.price || 0);
    } else if (q.type === 'multi') {
      for (const o of q.options) if (a.includes(o.value)) add += o.add || 0;
    }
  }
  const min = quote.minimum || 0;
  const total = Math.max(min, add * mult * (1 - discount));
  const spread = quote.spread ?? 0.15;
  const step = quote.round || 5;
  const round = (n) => Math.max(min, Math.round(n / step) * step);
  return { low: round(total * (1 - spread)), high: round(total * (1 + spread)), discount };
}

export function describe(quote, raw) {
  const answers = normalize(quote, raw);
  const parts = [];
  for (const q of quote.questions) {
    const a = answers[q.id];
    if (q.type === 'choice') parts.push(q.options.find((o) => o.value === a).label);
    else if (q.type === 'number') parts.push(`${a.toLocaleString('en-US')} ${q.unit || q.label.toLowerCase()}`);
    else if (q.type === 'multi' && a.length) parts.push(q.options.filter((o) => a.includes(o.value)).map((o) => o.label).join(', '));
  }
  return parts.join(' · ');
}
