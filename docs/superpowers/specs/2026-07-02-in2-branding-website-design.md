# IN2 Branding — Website Design Spec

**Date:** 2026-07-02
**Source material:** `In2 Branding.pdf` (8-page company presentation)

## Overview

Build a multi-page, multilingual marketing website for **IN2 Branding**, a Polish
company specializing in premium corporate gifting and branded products. The site is
built from the existing 8-page company presentation and must faithfully reproduce its
luxury aesthetic (cream/beige backgrounds, gold accents, elegant serif typography).

The site is content-only (no backend, no forms). It is a static site optimized for
maximum performance and SEO.

## Goals

- Reproduce the premium, editorial look of the PDF on the web.
- Serve content in **three languages**: Polish (primary/default), English, Romanian.
- Multi-page structure (4 pages) with clean navigation and a language switcher.
- Top-tier performance (near-perfect Lighthouse), zero framework JS shipped by default.
- Deployable as static files to any host (Netlify / Cloudflare Pages / Vercel).

## Non-goals (YAGNI)

- No contact form / email backend — contact page shows details only.
- No CMS. Translations live in versioned JSON data files.
- No e-commerce, no product database.
- No blog.

## Technology

- **Astro** (latest), `output: 'static'`.
- Astro **i18n routing** with path prefixes: `/pl`, `/en`, `/ro`. Polish is the default
  locale. `prefixDefaultLocale` decision: use prefixed routes for all locales
  (`/pl`, `/en`, `/ro`) for consistency; root `/` redirects to `/pl`.
- Translations stored as data files: `src/i18n/pl.json`, `en.json`, `ro.json`. A single
  set of page templates renders text pulled from the active locale's JSON.
- **No framework JS**. Small amount of vanilla JS only for: mobile nav toggle, optional
  subtle scroll-reveal animations (progressive enhancement — content visible without JS).
- Images optimized via Astro's `<Image>` component (`astro:assets`).

## Page structure (each page exists in all 3 languages)

| Page | Route (per locale) | Content from PDF |
|------|--------------------|------------------|
| **Home** | `/{lang}/` | Hero (logo + "Premium Corporate Gifting & Branded Products" + tagline) · Who We Are (5 points) · Why IN2 (6 differentiators) · CTA "Let's Create Something Exceptional" |
| **How We Work** | `/{lang}/how-we-work` | 2-step process (vision/occasion/budget → fully managed delivery) · Gift Sets That Promote Your Brand (description + 4 points) |
| **Portfolio** | `/{lang}/portfolio` | Our Work (premium product gallery) |
| **Contact** | `/{lang}/contact` | Aleksandra Stan · aleksandra.stan@in2consulting.pl · +48 509 919 558 · social links (in2scentedart.com, Instagram, Facebook) |

Localized route slugs are acceptable but optional; for simplicity the initial build uses
the same English slugs across locales (`how-we-work`, `portfolio`, `contact`). Nav labels
are translated.

## Design system (faithful to the PDF)

- **Colors:**
  - Cream / beige backgrounds: `#F5F0E8`, `#EDE4D8`
  - Gold accents: `#B8944D`, lighter gold `#C9A86A`
  - Dark brown text: `#2B2521`
  - Matte black for accent sections/cards (e.g. dark CTA, "Let's Create" section)
- **Typography** (final choices):
  - Headings: **Cormorant Garamond** (elegant high-contrast serif, matches PDF titles)
  - Body: **Jost** (refined geometric sans-serif)
  - Accent script for select emphasis (like "Something Exceptional"): **Great Vibes**,
    used sparingly
  - Fonts self-hosted or via Fontsource for performance; `font-display: swap`
- **Signature elements:**
  - Gold divider with center diamond ◆ (recurring in the PDF)
  - Thin gold line-art icons for the icon lists
  - Generous whitespace, editorial spacing
  - Subtle transitions/hover states; nothing flashy

## Reusable components

- `Layout.astro` — base HTML shell: `<head>` with SEO meta, `hreflang` alternates for
  the 3 locales, Open Graph tags, canonical, favicon.
- `Header.astro` — navigation + `LanguageSwitcher`.
- `Footer.astro` — short contact + social links.
- `LanguageSwitcher.astro` — PL / EN / RO, preserves current page when switching.
- `Section.astro` — consistent section wrapper (padding, max-width).
- `Divider.astro` — the gold ◆ divider.
- `IconList.astro` — renders a list of icon + heading + text items (used by Who We Are,
  Why IN2, How We Work, Gift Sets).
- i18n helper (`src/i18n/utils.ts`) — `useTranslations(lang)`, `getLocalizedPath()`.

## Images

Extract the premium product photography from the PDF and use as real optimized assets:
- Hero background / logo lockup
- Product shots for Who We Are, Why IN2, Gift Sets, Our Work gallery
- Dark CTA image for "Let's Create Something Exceptional"
Store under `src/assets/`, render via `<Image>` for responsive/optimized output.

## SEO & performance

- Per-page localized `<title>` and meta description.
- `hreflang` alternate links across pl/en/ro + `x-default`.
- Semantic HTML, accessible nav (keyboard + aria), alt text on all images.
- Static output, no client framework JS, optimized images → target ~100 Lighthouse.

## Deliverable / acceptance

- `npm run build` produces a static site with all 4 pages in pl/en/ro (12 routes).
- Root `/` redirects to `/pl/`.
- Visual fidelity to the PDF aesthetic on desktop and mobile (responsive).
- Language switcher works and preserves the current page.
- All content from the PDF is represented across the pages.
