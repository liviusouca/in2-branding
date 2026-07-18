import type { APIRoute } from 'astro';

const body = `# IN2 Branding (in2branding.pl)

> Premium corporate gifts and co-branding studio serving the Polish and European market. IN2 Branding designs and produces exclusive branded merchandise: curated gift sets, luxury products with client logos, custom packaging and full-service brand execution — from idea to finished product. Site available in Polish (default), English and Romanian.

Contact: https://in2branding.pl/pl/contact/ (EN: https://in2branding.pl/en/contact/)

## Main pages (Polish — default)

- [Strona główna](https://in2branding.pl/pl/): ekskluzywne prezenty firmowe i produkty z logo Twojej marki
- [Jak pracujemy](https://in2branding.pl/pl/how-we-work/): proces od pomysłu, wizji i budżetu do gotowego produktu, brandingu i opakowania
- [Portfolio](https://in2branding.pl/pl/portfolio/): przykłady realizacji — przemyślany branding, produkty premium
- [Kontakt](https://in2branding.pl/pl/contact/): rozpocznij projekt

## English pages

- [Home](https://in2branding.pl/en/)
- [How We Work](https://in2branding.pl/en/how-we-work/)
- [Portfolio](https://in2branding.pl/en/portfolio/)
- [Contact](https://in2branding.pl/en/contact/)

## Romanian pages

- [Acasă](https://in2branding.pl/ro/)
- [Cum lucrăm](https://in2branding.pl/ro/how-we-work/)
- [Portofoliu](https://in2branding.pl/ro/portfolio/)
- [Contact](https://in2branding.pl/ro/contact/)

## Sitemap

- [Sitemap XML](https://in2branding.pl/sitemap.xml): all pages in all three languages with hreflang alternates
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
