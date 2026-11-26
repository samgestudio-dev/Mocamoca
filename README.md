# MocaMoca Playground

Phone-first prototypes and animations for MocaMoca, served with GitHub Pages.

**Open on your phone:** https://samgestudio-dev.github.io/Mocamoca/ — a picker page with two tabs:
**Prototypes** (interactive flows) and **Animations** (illustration animations, played one at a time as Lottie or GSAP).

## Prototypes

| Demo | Variants |
| --- | --- |
| dito landing page | [Up to ₱90,000](prototypes/dito-landing-page/up-to-90k.html) (sign-up → credit check → approved popup) · [Up to ₱90,000 · approved popup](prototypes/dito-landing-page/up-to-90k-approved.html) · earlier zero-interest version: [Standard](prototypes/dito-landing-page/index.html) · [Approved popup](prototypes/dito-landing-page/credit-approved.html) |

## Animations

None yet. Add one to `animations/<name>/` and register it in `animations/animations.js`; it then shows on the
Animations tab and plays in `animations/player.html?a=<name>` (replay, play/pause, frame scrubber, speed,
background swatches, Lottie / GSAP switch).

## Source projects (not on the picker)

- `tokens/` — the MocaMoca design tokens pulled from Figma. Use **v2** by default: `tokens/v2/tokens.css` (CSS
  variables) and `tokens/v2/*.tokens.json` (DTCG). `python3 tokens/build-tokens.py` rebuilds them from `tokens/figma-raw.json`.
- `landing/` — the MocaMoca **SMS landing page** (白名单卖点落地页 / 导流落地页) in React + Framer Motion (Vite). To run it on this Mac and on a phone,
  double-click `tools/landing-server.command` (port 5173; it prints the phone address).

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
