import type { APIRoute } from 'astro';
import { locales, getPath } from '../i18n/utils';

const SITE = 'https://in2branding.pl';

// crawl hints per route; '' = home
const ROUTES: Record<string, { changefreq: string; priority: string }> = {
  '':            { changefreq: 'monthly', priority: '1.0' },
  'how-we-work': { changefreq: 'monthly', priority: '0.8' },
  'portfolio':   { changefreq: 'monthly', priority: '0.9' },
  'contact':     { changefreq: 'yearly',  priority: '0.8' },
};

export const GET: APIRoute = () => {
  const urlEls = Object.entries(ROUTES).flatMap(([route, meta]) => {
    const hrefs = Object.fromEntries(locales.map((l) => [l, `${SITE}${getPath(l, route)}`]));
    const alternates = [
      ...locales.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${hrefs[l]}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${hrefs['pl']}" />`,
    ].join('\n');
    return locales.map((l) => `  <url>
    <loc>${hrefs[l]}</loc>
${alternates}
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
