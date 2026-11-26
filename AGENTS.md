# Agent guide

See [CLAUDE.md](CLAUDE.md) — how this repo is laid out, how to add a demo to the picker (`index.html` → `DEMOS`), the requirements for a demo page, and how to publish.

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
