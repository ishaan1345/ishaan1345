# Ship Before AGI

You steer. Your AI agent fights. The timeline is coming for you.

A 4-minute arcade survival game drawn on graph paper, about building with AI before the clock runs out.

**Play:** https://ishaan1345.github.io/ishaan1345/

## How it plays

- **Move** with WASD, the arrow keys, or drag anywhere on a phone. Your AI agent floats next to you and shoots on its own.
- **Context window.** Every shot and kill fills your agent's context. More context makes it stronger. Past about 75% it starts **hallucinating**: shots go wild, it shoots at enemies that aren't there, it "refactors" your own products, and it tells you it deleted the tests so they pass. At 100% it crashes.
- **Space = /compact.** Wipes the context and releases a blast whose size depends on how full the context was. Ride the edge.
- **Shift = ⌘Z.** Rewinds you 1.5 seconds and undoes the damage. "You're absolutely right!"
- **Ship.** Kills drop green commits that fill your contribution graph. When it's full you pick a product, and it gets built where you stand. Each product earns MRR and gives a perk while it's up: Boring B2B, AI wrapper, Dev tool, Indie game (its fans shoot), Newsletter, Extension, Agent framework, AI course.
- **Accept all ⇥** gives you all three products, but one of them is a hallucination (an NFT of your codebase, `rm -rf ./products`) and you take on tech debt.
- **Defend prod.** Bugs eat products. Down products earn nothing; stand on one to hotfix it.
- **Pick a model.** Nano is fast and cheap, Pro is balanced, Max is brilliant, expensive, and hallucinates early.
- **Survive** notification storms, flex tweets that drain your focus, merge conflicts with a beam between them, scope creep that keeps growing, meetings that stun you, phones that make time run 2x, a 529 outage that takes your agent offline, and a Frontier Lab boss that ships your best product for free. Beat the boss for a model upgrade: Parallel agents, Reasoning mode, Tool use, Bigger context window.

Hit $10,000 MRR before AGI arrives. The date moves while you play.

## Run it

It's one HTML file with no build step and no dependencies. Open `index.html` in a browser, or serve the repo with GitHub Pages.

To show a tip link on the end screen, set `TIP_URL` near the top of the script in `index.html`.
