# MocaMoca Playground — agent guide

Phone-first prototypes and animations for MocaMoca, served by GitHub Pages from `main` / root.
Same setup as the PeraSure Playground (samgestudio-dev/Perasure): picker, shared UI kit, shared fonts and libraries.

- Live picker: https://samgestudio-dev.github.io/Mocamoca/
- Each demo is opened and tested on a real phone (MocaMoca is Android-only, so Android Chrome first; iOS Safari too).
- The owner is a designer; reply in plain language and keep the picker page tidy.

## Layout

```
index.html                 picker ("Playground"): "Prototypes" tab (DEMOS array) + "Animations" tab (reads animations/animations.js)
assets/playground-ui.js    shared Material UI theme (MocaMoca mint) + icons for the picker and the player (window.PG)
assets/fonts/              Nunito + Nunito Sans (variable, latin + latin-ext incl. ₱) + fonts.css — shared by all prototypes
prototypes/_template/index.html  starting point for a new prototype (links the shared fonts and libraries); not on the picker
prototypes/<slug>/index.html    main / recommended variant of a demo
prototypes/<slug>/<variant>.html  other variants of the same demo (optional)
prototypes/<slug>/assets/       the prototype's own images (photos, logos)
animations/animations.js       Lottie registry (LOTTIES array, empty for now) — shared by the picker and the player
animations/player.html         player, one animation at a time: player.html?a=<slug>[&r=gsap] (Lottie / GSAP tabs)
animations/<slug>/             <slug>.json (+ <slug>.lottie, preview.png, gsap/<module>.js)
tools/                     stamp.py (cache busting), prototype-thumbs.py (picker screenshots), Lottie / SVG fix scripts
vendor/<lib>@<version>/    pinned libraries: lottie-web, gsap (+ plugins; esm/ = ES modules), react, react-dom, mui-material,
                           motion (motion-react.js = React API, motion.js = vanilla; both set window.Motion), matter-js
README.md                  human-facing summary + demo / animation tables
.nojekyll                  keep: Pages serves files as-is
tokens/                    design tokens pulled from Figma (see "Design tokens" below)
landing/                   source of the MocaMoca SMS landing page: React 18 + Framer Motion + Vite (has a build step,
                           so it is a source project, not a Playground demo; not on the picker)
tools/landing-server.command  one-click local server for landing/ on port 5173 (also prints the phone addresses)
```

`<slug>` is lowercase-kebab-case, e.g. `dito-landing-page`, `repayment-success`.

## Adding a demo

1. Put the demo's file(s) in `prototypes/<slug>/` — for a new one, start from a copy of `prototypes/_template/index.html`.
   The recommended variant is `index.html`; name other variants by what differs (`with-blur.html`, `snappy-spring.html`).
   A variant that is the same page opened in another state can be a tiny redirect page
   (see `prototypes/dito-landing-page/credit-approved.html` → `index.html?show=approved`).
2. Register it in the `DEMOS` array in the root `index.html` (inside the `<script>`):

   ```js
   {
     title: 'Repayment success',          // sentence case, short
     tag: 'Loan',                          // optional small pill: product area / status
     desc: 'One sentence: what flow it covers and what motion to look at.',
     variants: [                           // first entry = recommended ("Recommended" label when there are several)
       { name: 'Standard', note: 'What is special about this variant', href: 'prototypes/repayment-success/index.html' }
     ]
   }
   ```

   - Link to the file explicitly (`.../index.html`), not the folder — folder links break when the repo is opened locally.
   - Newest demo goes at the top of the array unless the owner says otherwise.
   - Only edit the `DEMOS` array for a normal addition; don't restyle the picker unless asked.
   - The picker and the player are React + Material UI 5 (browser builds in `vendor/`, no JSX, no build step;
     `PG.h` = `React.createElement`). Style through the theme in `assets/playground-ui.js`, not per page.
     Colours: `PG.C.brand` (#0E8A75, mint dark enough for text), `C.mint` (#1CBFA2), `C.orange` (#F4511E, action only).
     Brand rule: Moca Mint #1CBFA2 is never a card background or a backdrop behind photos.
   - All Playground interface motion is Motion (`vendor/motion@14.4.0/motion-react.js`, `PG.m` / `PG.Mo`), never CSS
     transitions or the MUI ripple: springs from `PG.T`, `whileTap: PG.TAP` on everything pressable, `layoutId` for
     indicators that move between options, `AnimatePresence` for content that swaps, and `layout` on cards.
3. Make the option screenshots shown on the index: `python3 tools/prototype-thumbs.py <slug>` (writes
   `prototypes/<slug>/preview.webp`, `preview-<variant>.webp`; adjust its `WAIT` if the first screen needs time).
4. Add a row to the demo table in `README.md`.
5. Removing or renaming a demo: update the folder, the `DEMOS` entry and the README row together.

## Design tokens — use v2 by default

- Source: Figma "Mocamoca design system" (file key `6plHhEEqEpg1OmDGSiyjtp`).
- **Default to the v2 tokens** for all UI work: the `primitives-v2` and `semantic-v2` (light/dark) variable collections,
  the `v2/*` text styles and the `Shadow/*` effect styles.
- Everything else is **legacy** and is named that way in Figma (renamed 2026-11-25, same IDs): the collections
  `legacy/Primitive`, `legacy/Semantic`, `legacy/Component` and the text styles under `legacy/` (`legacy/Display/*`,
  `legacy/Heading/*`, `legacy/Body/*`, `legacy/Label/*`). Do not use them unless asked; new non-v2 assets go under `legacy/` too.
- In code, prefer **semantic** tokens (`--color-text-primary`, `--color-bg-surface`, `--spacing-gap-md`, `--radius-card`,
  `--text-body-m`…) over raw primitives.
- Files:
  - `tokens/figma-raw.json`: raw snapshot of every Figma collection/style (legacy included)
  - `tokens/build-tokens.py`: regenerates `tokens/v2/` from the snapshot (`python3 tokens/build-tokens.py`)
  - `tokens/v2/*.tokens.json`: DTCG tokens; `tokens/v2/tokens.css` holds the CSS variables (light default, dark via
    `[data-theme="dark"]` / `prefers-color-scheme`)

## Landing page source (`landing/`) — SMS landing page / 白名单卖点落地页 / 导流落地页

- MocaMoca SMS landing page: hero from Figma `2850:35688`, loan calculator mock (0.3 % a day, 4 / 6 / 8 terms of 15 days),
  "Why Choose MocaMoca?" card from Figma `2843:34556`, getting-started steps, closing band. Copy outside the hero and the
  calculator is MocaMoca's own, deliberately different from PeraSure's.
- Uses `tokens/v2/tokens.css` (imported from `landing/src/index.css`); light mode only. On phones the 360 px design is
  enlarged with the screen, at most 1.15× (`landing/public/phone-fit.js`, PeraSure's "cap" rule).
- Run: double-click `tools/landing-server.command`, or `npm --prefix landing install` once, then `npm --prefix landing run dev`.
- Placeholders to confirm before launch: the Google Play link (`landing/src/config.ts`) and the amount range (`landing/src/loan.ts`).
- Design backup in Figma: page "25 nov 2026 - 白名单卖点落地页", Section 1 (plain frames, v2 tokens bound).

## Adding a Lottie animation

Same as the PeraSure Playground: files in `animations/<slug>/` (Lottie JSON, `.lottie`, still `preview.png`, optional
`gsap/<module>.js`), one entry in `LOTTIES` in `animations/animations.js` (field reference at the top of that file),
a row in the README. Don't edit `player.html` for a normal addition. The mask / scale fix scripts in `tools/`
(`flatten-lottie-masks.py`, `flatten-svg-masks.py`, `unscale-gsap-svg.py`, `smooth-traced-path.py`) work the same here.
Renderer: lottie-web SVG (`vendor/lottie-web@5.12.2/lottie_svg.min.js`), not canvas.

## Requirements for a demo page

- Phone screens are designed at 360 CSS px wide: on touch devices set the viewport to `width=360` (the template does)
  and fill the visible height — no phone frame or fake status bar. Websites (like `dito-landing-page`) stay responsive.
- `touch-action: manipulation` on interactive elements.
- iOS Safari 26+ tints the status bar and toolbar from `position:fixed` layers that reach the screen edges: a closed
  modal / scrim must be `display:none`, not just invisible (see the landing page's `.approve` popup).
- Bottom sheets with text inputs must avoid the on-screen keyboard (lift with `visualViewport`).
- Motion: Motion (`LazyMotion` + `m`) or GSAP; animate `transform` / `opacity`; respect `prefers-reduced-motion`.
- Shared environment, not bundles: link the fonts (`<link rel="stylesheet" href="../../assets/fonts/fonts.css">`,
  `font-family: var(--mm-font-display | --mm-font-body)`) and libraries (`<script src="../../vendor/…">`) from the repo.
  Never a CDN at runtime, no build step, no base64 fonts or pasted library code. Images go in the prototype's
  `assets/` folder rather than as base64.
- Don't break existing prototypes: never edit another prototype's files when adding a new one.

## Checking before you push

- **Index:** decide whether the file index in `AGENTS.md` needs an edit (see "Keep this index current" there); if it does, update it in this commit.
- Open the picker and every new link at a phone viewport (e.g. 390×664, touch, DPR 3) and confirm the demo
  loads with no console errors. Tap through the main flow once.

## Caching

GitHub Pages lets browsers reuse a file for 10 minutes. Before committing, run `python3 tools/stamp.py`: it stamps the
shared scripts (`?v=<stamp>`), and the index adds that stamp to every link and thumbnail.

## Publishing

- Commit to `main` and push; GitHub Pages redeploys automatically (about a minute).
- Pages is configured in the repo settings (Settings → Pages → Deploy from a branch → `main`, folder `/`).
  If the live link 404s, check that setting and that the repo is public.
- Give the owner the direct demo link as well as the picker link.
