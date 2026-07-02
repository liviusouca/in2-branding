import pl from './pl.json';
import en from './en.json';
import ro from './ro.json';

export const languages = { pl: 'Polski', en: 'English', ro: 'Română' } as const;
export const defaultLang = 'pl';
export const locales = ['pl', 'en', 'ro'] as const;

export type Lang = (typeof locales)[number];

const dictionaries = { pl, en, ro } as const;
export type Dictionary = (typeof dictionaries)['en'];

/** Pull the locale prefix out of a URL pathname (defaults to `pl`). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if ((locales as readonly string[]).includes(seg)) return seg as Lang;
  return defaultLang;
}

/** Full translation dictionary for a locale. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Build a localized path, e.g. getPath('en', 'contact') -> '/en/contact'. */
export function getPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/** Route key for a page, used by the language switcher to stay on the same page. */
export type RouteKey = 'home' | 'how-we-work' | 'portfolio' | 'contact';

export function getAlternates(current: RouteKey) {
  return locales.map((lang) => ({
    lang,
    href: getPath(lang, current === 'home' ? '' : current),
  }));
}
