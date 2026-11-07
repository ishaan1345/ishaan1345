# One Light-Day Out

On **November 18, 2026 at 10:16:07 UTC**, Voyager 1 becomes the first object people have built to sit a full light-day from Earth. It switched its cameras off in 1990, right after the Pale Blue Dot. This page rebuilds the sky it would see tonight.

Open `index.html` in a browser. It loads three.js from a CDN.

## What's real

- **Voyager 1's position.** It comes from a JPL Horizons heliocentric state vector at the milestone instant and is propagated linearly, since the spacecraft is coasting. At 10:16 UTC on Nov 18 the Earth–Voyager distance from this data is 173.1446 AU, which is exactly one light-day.
- **The planets.** These come from JPL Horizons osculating elements (epoch 2026-11-18) solved with Kepler's equation. The propagated Earth lands within 21 km of Horizons' own vector. Every body is drawn where it was when the light now reaching Voyager left it (light-time corrected).
- **The Moon.** It comes from a 6-hourly geocentric Horizons ephemeris covering Nov 2026 to Dec 2027.
- **The stars.** 5,044 stars to magnitude 6 and the constellation figures come from the HYG-derived catalog in [d3-celestial](https://github.com/ofrohn/d3-celestial) (BSD-3, © Olaf Frohn).
- **The Milky Way.** It's procedural, but laid along the true galactic plane (J2000 galactic rotation matrix).

## What the geometry says

- From Voyager, the Sun sits in **Lepus**, under Orion's foot, **4.0° from Rigel**. It shines at about magnitude −15.6, roughly 13× brighter than our full Moon, but it is only 11″ across.
- The whole planetary system fits inside about **9–10°** of the Sun. Jupiter is 1.6° away, and Neptune 9.2° on Nov 18.
- Earth is about **0.21–0.24°** from the Sun. Its entire orbit is a ring **0.66°** across, a little wider than the full Moon looks from Earth.
- Earth and the Moon are about **3″** apart.
- Voyager is heading into **Ophiuchus**, within **0.9°** of Rasalhague, at 16.9 km/s.

Every number in the captions is computed live in the page from this data.

See `BRIEF.md` for the creative brief this was built from.
