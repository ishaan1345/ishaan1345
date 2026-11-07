# Perihelion

A one-thumb 3D gravity-slingshot game in a single HTML file.

Fly a small rocket through an endless, procedurally generated field of planets. Each planet pulls on you. A dotted line shows where gravity will carry you if you let go. Collect shards to refill your Δv, chain them for a multiplier, and skim atmospheres for bonus points, since air drag slows you down. Touch the ground or run out of Δv, and the run ends.

## Play

Open `index.html` in a browser. It loads three.js from a CDN, so you need to be online.

- **Touch / mouse:** hold anywhere to burn toward your finger or cursor.
- **Keyboard:** ← → (or A / D) steer, ↑ / W / Space burn, M mutes.

## Stack

- [three.js](https://threejs.org) r170 (ES modules via import map, no build step)
- Custom GLSL shaders: simplex-noise planets (gas bands, terrain, ice caps), fresnel atmospheres, ringed giants with planet shadows, an exhaust flame
- `UnrealBloomPass` + ACES tone mapping for the glow
- A nebula sky baked once into a cube map, a camera-locked star field and parallax dust
- Fixed-step semi-implicit Euler physics. The same integrator runs the rocket and the 7-second trajectory preview
- Synthesized Web Audio: engine rumble, atmosphere hiss, pickup chimes that climb with your chain, explosion

## Tuning

Every gameplay number sits in the `T` object near the top of the script: thrust, tank size, shard value, chain window, drag, and planet spacing. 1 world unit is 100 m, and Δv is literal: burning for one second spends `THRUST` units of velocity.
