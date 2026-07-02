# IN2 Branding — Website

Multilingual marketing site for IN2 Branding (premium corporate gifting & branded
products), built from the company presentation. Built with **Astro** (static output).

## Languages
Polish (default), English, Romanian — routed at `/pl`, `/en`, `/ro`. Root `/` redirects to `/pl/`.

## Pages (× 3 languages)
- **Home** — hero, Who We Are, Why IN2, CTA
- **How We Work** — process + Gift Sets
- **Portfolio** — Our Work gallery
- **Contact** — details only (Aleksandra Stan, email, phone, socials)

## Commands
```bash
npm install       # install dependencies
npm run dev       # local dev server (http://localhost:4321)
npm run build     # static build -> dist/
npm run preview   # preview the production build
```

## Deploy
`npm run build` outputs a fully static site in `dist/`. Deploy that folder to any
static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages). No server needed.

## Editing content
All text lives in `src/i18n/{pl,en,ro}.json`. Edit those to change copy; the page
templates are shared. Update `site` in `astro.config.mjs` to your final domain
(currently `https://www.in2scentedart.com`) so canonical/hreflang/OG URLs are correct.

## Webchat assistant
A floating chat assistant appears on every page (`src/components/ChatWidget.astro`).
It runs fully client-side — no backend, no API keys, no cost. It answers questions
about corporate gifting, branding techniques, products, ordering, pricing and
sustainability using a researched knowledge base, and replies in the page's language.
For anything it can't match, it points the visitor to Aleksandra Stan's contact details.

- Knowledge base (43 Q&A per language): `src/data/chat-{pl,en,ro}.json`
  — each entry has `keywords`, `question`, `answer`. Add/edit entries here to extend it.
- Widget UI text and quick-reply chips: the `chat` section of `src/i18n/{pl,en,ro}.json`.
- Matching is keyword + token based (with light stemming and a stopword filter), so it
  handles natural phrasing and plurals. It is not a generative AI — it answers from the
  knowledge base and guides visitors to contact for anything outside it.

## Images
Product photos were extracted and cropped from the source PDF into `src/assets/`.
The crop script is `scripts/prepare-images.mjs` (reads `extracted_images/`).
