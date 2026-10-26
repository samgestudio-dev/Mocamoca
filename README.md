# MocaMoca Playground

Phone-first prototypes and animations for MocaMoca, served with GitHub Pages.

**Open on your phone:** https://samgestudio-dev.github.io/Mocamoca/ — a picker page with two tabs:
**Prototypes** (interactive flows) and **Animations** (illustration animations, played one at a time as Lottie or GSAP).

## Prototypes

| Demo | Variants |
| --- | --- |
| First installment, zero interest (landing page) | [Standard](prototypes/landing-page/index.html) (sign-up → credit check → approved popup) · [Credit approved popup](prototypes/landing-page/credit-approved.html) (opens on the popup) |

## Animations

None yet. Add one to `animations/<name>/` and register it in `animations/animations.js`; it then shows on the
Animations tab and plays in `animations/player.html?a=<name>` (replay, play/pause, frame scrubber, speed,
background swatches, Lottie / GSAP switch).

## Shared environment

- `assets/fonts/` — Nunito and Nunito Sans (variable, all weights; Latin + Latin Extended, so ₱ is in the font) with
  `fonts.css`, which defines `--mm-font-display` (Nunito) and `--mm-font-body` (Nunito Sans).
- `vendor/` — pinned copies so demos don't depend on a CDN: lottie-web 5.12.2, GSAP 3.15.0 (+ plugins, also as ES
  modules in `esm/`), React 18.3.1, ReactDOM 18.3.1, Material UI 5.18.0 (Playground pages; theme in
  `assets/playground-ui.js`), Motion 14.4.0 (`motion-react.js` for React, `motion.js` without React) and Matter.js 0.19.0.

## Adding a demo

Easiest: give the demo's HTML file to Claude and say "add this to the MocaMoca playground" — the agent guide in
[`CLAUDE.md`](CLAUDE.md) says where the file goes and how to list it on the picker.

By hand:

1. Copy `prototypes/_template/` to `prototypes/<name>/`, with the main version as `index.html`.
2. Open the root `index.html`, find the `DEMOS` list and add an entry: title, a one-line description and one
   line per variant (the first one is shown as recommended).
3. Run `python3 tools/prototype-thumbs.py <name>` and `python3 tools/stamp.py`, add a row to the table above,
   commit to `main` and push. The live site updates in about a minute.
