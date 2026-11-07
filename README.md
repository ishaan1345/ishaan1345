# Ship Before AGI

You're the founder. Your AI swarm does the fighting.

A 4-minute doodle action game about launching products before AGI shows up. Hit $10,000 MRR after the AI bill before the clock runs out.

**Play:** https://ishaan1345.github.io/ishaan1345/

## How it plays

- **Move** with WASD, arrow keys, or drag on a phone. Your agents orbit you and fire on their own.
- **Collect signups.** A full waitlist means a launch. Each launch puts a product on the map, and products pay MRR.
- **Protect your products.** Enemies go after them. A product at 0 is down and earns nothing until you stand on it, or until on-call reboots it.
- **/compact** (Space): agents fill their context as they work. Past 75% they hallucinate, firing wild and seeing things that aren't there. At 100% they go offline. Compact vents everything into a shockwave.
- **⌘Z** (Shift): rewinds you 1.5 seconds and undoes the damage.
- **Drop an agent** (E): leave one guarding a product, or pick it back up.
- **The AI bill is real.** Every model costs money each month, and your score is MRR after the bill.

## The swarm

Real models, each with its own attack:

| Model | Attack | AI bill |
| --- | --- | --- |
| Claude Opus 5.5 | The best. Charges a beam that pierces everything in a line. | $200/mo |
| GPT-6 Astra | Circles targets in red pen so everything hits them harder. Has a quick question. | $500/mo |
| Claude Sonnet 5.5 | The daily driver. Steady rapid fire. | $100/mo |
| Claude Haiku 5.5 | Cheap homing darts and a cloud of subagents. | $15/mo |
| Gemini 4 Argon | Lobs gas balloons that splash. Fills its context fast. | $100/mo |
| DeepSeek V4.1 Flash | Open weights. A cheap close-range shotgun. | $8/mo |
| Claude Fable 5.1 | Give it the long job and walk away. Tireless when dropped. | $500/mo |

Agents send out subagents that hunt, grab signups, and come back. You can run up to 6.

## What you're up against

- **Notifications:** @channel, "per my last message", "just following up". They come in storms.
- **1-star reviews:** they chew on your products. "doesn't work on Safari."
- **Flex tweets:** "$1M ARR at 19". Standing near one drains your focus.
- **Scope creep:** "can we also add…". It grows the longer you leave it.
- **Meetings:** "quick call?" stuns you. **Doomscrolling** makes days pass twice as fast.
- **Legal:** two lawyers string red tape between them.
- **Recruiters:** they grab an agent and run. Hit them once to make them let go.
- **Prompt injection:** a PDF that spikes an agent's context.
- **Dev Day keynote:** Big Tech spotlights your best product. Hit the keynote hard enough or your product gets sherlocked.
- **529 Overloaded:** your whole swarm slows down for a few seconds.

## Launches run on real companies

Each launch, pick the company that product runs on. Most perks only work while that product is up.

| Company | What it does |
| --- | --- |
| AWS Activate | $100k credits. Then the bill. |
| Google Cloud | Killed by Google: one enemy type |
| Azure | GPT-6 Astra joins after quota approval |
| Clay | Enriched: 1 in 6 signups is a whale |
| Stripe | Usage-based billing: kills near products pay |
| Cloudflare | Are you human? Enemies stall at products |
| Product Hunt | Launch day: race the rival to #1 |
| Hacker News | Front page: signups, trolls, hug of death |
| Y Combinator | Talk to users: stand still, signups come |
| a16z | Series A: Opus joins, goal goes up |
| Notion | Agents read the docs: hallucinate later |
| Figma | Multiplayer cursor box-selects and deletes |
| PostHog | Session replay: ⌘Z rewinds through enemies |
| ElevenLabs | Voice agent cold-calls: 1 in 5 converts |
| LinkedIn | Post "Agree?": enemies stop to like it |
| Uber | Surge pricing: crowded screen, 2x MRR |
| Airbnb | Sell cereal: survive one burnout |
| Granola | Meetings become notes. Walk into them. |
| Ramp | Time is money. Save both. |
| Typeform | One question at a time: single file |
| X | Community Notes on every flex tweet |
| Dropbox | Refer a friend: every signup brings one |
| Lovable | Vibe-coded: launch faster, break easier |
| Cursor | Tab, tab, tab: next Accept all is clean |

**Accept all** (Tab) takes all three, but one gets swapped for a famous flop: Quibi, Juicero, or WeWork.

## Run it

It's one HTML file with no build step and no dependencies. Open `index.html` in a browser, or serve the repo with GitHub Pages.

To show a tip link on the end screen, set `TIP_URL` near the top of the script in `index.html`.

Company and model names belong to their owners. The icons are hand-drawn doodles, not logos.
