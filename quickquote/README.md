# QuickQuote

An instant-quote calculator for local service businesses, plus a one-command way to sell it.

A visitor on a cleaner's, painter's or pressure washer's website picks what they need, sees a price immediately, and leaves their number. The owner gets the lead on their phone. Most of these businesses already pay $50–$300 per lead to sites like Angi and Thumbtack. One extra job a month covers the fee many times over.

**Why this, and not another app:** anyone can build software now, so a product is worth very little to people who can build. It's worth a lot to people who never will, and they pay for results. You aren't competing with the people shipping on Twitter. You're selling to a plumber.

## The money loop

1. **Find businesses** (Google Maps: `house cleaning Austin`, `pressure washing Tampa`, …). Pick ones that **have a website but no prices on it** and a decent number of reviews. They already get traffic and are already losing it.
2. **Make their demo** with one command:
   ```
   node new-demo.js "Joe's Pressure Washing" pressure-washing "Tampa, FL" --phone "(813) 555-0100"
   ```
   This prints a personalized demo link (their name, their city, working calculator) and a message ready to send.
3. **Send it** by email, through their website contact form, or as a Facebook or Instagram DM. Do 10 a day. A link they can click beats any pitch.
4. **When someone says yes:** set their real prices in `businesses/<slug>.json` (override anything under `"quote"`), set up their lead alert (below), and paste the two-line embed code on their site, or send it to whoever runs their site.
5. **Charge:** free for 14 days, then **$99/month**. Taking card payments via a Stripe Payment Link is fine to start.

Ten customers is $990/month. The setup is the same every time, so it scales with your outreach, not your coding.

## Run it

Needs Node 20+. There are no dependencies.

```
cd quickquote
ADMIN_KEY=pick-a-secret node server.js
```

- `http://localhost:3000/` is the sales page, with a live calculator
- `http://localhost:3000/demo/demo-cleaning` is a sample personalized demo
- `http://localhost:3000/leads?key=pick-a-secret` shows every lead, from every business

Trades included: `cleaning`, `pressure-washing`, `painting`, `junk-removal`, `lawn-care`. To add one, copy a file in `trades/` and change the questions and prices.

## Deploy (so the demo links work for other people)

Any host that runs `node server.js` and keeps a disk works: Render, Railway, Fly.io, or a $5 VPS. Set:

| Env var | What it does |
| --- | --- |
| `PUBLIC_URL` | Your deployed URL, e.g. `https://quotes.yourname.com`. `new-demo.js` uses it in links |
| `ADMIN_KEY` | Password for `/leads` |
| `CONTACT_EMAIL` | Shows a "Get it on your site" button on the sales page |
| `LEAD_WEBHOOK_URL` | Optional: also send *every* lead to you (Slack, Discord, Zapier, or ntfy) |
| `DATA_DIR` | Where `leads.jsonl` is written. Point it at the persistent disk |

Business configs live in `businesses/` and are committed with the code. After you add one, push and redeploy, or run `new-demo.js` on the server.

## Getting leads to the owner's phone

Per business, set `"notify": { "webhook": "…" }` in its config (or pass `--webhook` to `new-demo.js`):

- **Free phone push:** the owner installs the ntfy app and subscribes to a long random topic, and you set the webhook to `https://ntfy.sh/that-topic`.
- **Text message:** use a Zapier or Make "catch webhook" step, then send an SMS. The lead arrives as JSON with a ready-made `text` field.
- **Slack or Discord:** paste their incoming-webhook URL.

Leads are always saved to `data/leads.jsonl` too, so nothing is lost if an alert fails.
