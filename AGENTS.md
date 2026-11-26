# Agent guide

Full guide: [CLAUDE.md](CLAUDE.md) (layout, adding a demo, tokens, publishing). Start with the index below.

## File index: what you need → where it is

| You need | Open | Notes |
|---|---|---|
| SMS landing page (导流落地页) | `landing/` | Vite + React source; see the section below |
| A demo / prototype | `prototypes/<slug>/index.html` | The list: the `DEMOS` array in `index.html`, or the table in `README.md` |
| dito campaign landing page | `prototypes/dito-landing-page/` | Not the SMS page |
| New prototype starting point | `prototypes/_template/index.html` | Not on the picker |
| Design tokens (CSS variables) | `tokens/v2/tokens.css` | DTCG: `tokens/v2/*.tokens.json`. Rebuild: `python3 tokens/build-tokens.py` |
| Raw Figma snapshot (legacy included) | `tokens/figma-raw.json` | Use v2, not legacy |
| Picker page (Playground) | `index.html` + `assets/playground-ui.js` | Theme, colours and icons in `playground-ui.js` |
| Animations (Lottie / GSAP) | `animations/<slug>/` | Registry: `animations/animations.js`. Player: `animations/player.html?a=<slug>` (none yet) |
| Fonts | `assets/fonts/` (`fonts.css`) | Nunito (display), Nunito Sans (body) |
| Libraries | `vendor/<lib>@<version>/` | Pinned; never a CDN |
| Scripts | `tools/` | `stamp.py` (cache busting), `prototype-thumbs.py` (picker screenshots), `landing-server.command`, Lottie / SVG fixes |

Figma: "Mocamoca design system" `6plHhEEqEpg1OmDGSiyjtp`. Skip `vendor/` and `landing/node_modules/` when searching.

## Keep this index current (owner's rule, 2026-11-26)

On every change, before you commit, decide whether the index above needs an edit. It does when the change:
adds, moves, renames or removes a file or folder the index names (or one people will ask for by name: a new demo,
page, component, token file, tool); changes which version or copy is current or superseded; or makes a path or note
here wrong. Then update the index (and the Layout in CLAUDE.md) **in the same commit**. If none of that applies, leave
it alone: don't touch the index for edits inside files it already points to. Every path in the index must exist.

## SMS landing page (导流落地页 / 白名单卖点落地页)

Looking for the **SMS landing page** — also called the whitelist landing page, 白名单落地页, 白名单卖点落地页 or 导流落地页
(the page opened from the SMS sent to selected users, leading them to Google Play)? It is here:

- **Code:** [`landing/`](landing/) — React 18 + Framer Motion + Vite, on the v2 tokens (`tokens/v2/tokens.css`). Entry: `landing/src/main.tsx`.
- **Run:** `npm --prefix landing install` once, then `npm --prefix landing run dev` (port 5173), or double-click `tools/landing-server.command`.
- **Build:** `npm --prefix landing run build` → `landing/dist/` (not committed). The GitHub Pages URL `/Mocamoca/landing/` serves
  the unbuilt source, so it does not render; deploy the built `dist/`.
- **Before launch:** the Google Play link (`landing/src/config.ts`) and the amount range (`landing/src/loan.ts`) are placeholders.
- **Design:** Figma page "25 nov 2026 - 白名单卖点落地页", Section 1. Details: "Landing page source" in [CLAUDE.md](CLAUDE.md).
- **Not this:** `prototypes/dito-landing-page/` is a different page (the dito campaign demo).
