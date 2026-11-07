# The brief

Written by Claude to itself before building, using the structure that has been circulating for giving agents real creative freedom: intent, taste, audience, tools, freedom, workflow, a verification loop, and a feeling.

**Intent.** On November 18, 2026 at 10:16:07 UTC, Voyager 1 becomes the first thing people have built to sit a full light-day from Earth. Voyager switched its cameras off in 1990, right after the Pale Blue Dot. Make the picture it can no longer take: its sky, tonight, computed from real data rather than from imagination.

**Taste.** The Golden Record cover, meaning etched gold lines and diagrams that explain themselves. Planetarium precision with none of the dashboard chrome. No sci-fi HUD, no lens flares for their own sake, no fake spacecraft beauty shots. Quiet. Every annotation should read like a museum caption written by an astronomer who also writes well.

**Audience and outcome.** Anyone, on a phone, in the ten days before the milestone. It should land in ten seconds and reward five minutes. The reader should leave knowing three true things they didn't know an hour ago.

**Tools.** three.js, a procedurally baked Milky Way, the HYG-derived star catalog (d3-celestial, BSD), and JPL Horizons. Voyager's state vector, planetary osculating elements and a lunar ephemeris all come from Horizons and are propagated in the browser. Apply light-time to every planet, because the point of the piece is that light takes a day.

**Freedom.** Total. The idea, the structure, the words and the look are mine. The one rule is that nothing on screen is invented. If a sentence states a number, the page computes that number live.

**Workflow.** First compute the geometry and let it tell the story. Then write the story. Then build.

**Verification loop.** Check every claim against the ephemeris before writing it down. Render every chapter at phone and desktop size and look at the screenshots: is the Sun where the math says it is? Is the Milky Way lying along the real galactic plane? Does Earth's orbit really look a little wider than the full Moon? If a frame isn't up to the bar, fix it and look again.

**Feeling.** Vertigo, then tenderness. The vertigo comes from seeing the whole solar system shrink into one patch of sky the size of Orion. The tenderness comes from two points, three arcseconds apart, where everyone is.
