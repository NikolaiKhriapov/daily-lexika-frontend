export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code'];

const LOCALE_STORAGE_KEY = 'landing-yekaterina-locale';

export const isSupportedLocale = (locale?: string | null): locale is SupportedLocale => {
  return locale === 'en' || locale === 'ru';
};

export const normalizeLocale = (locale: string): SupportedLocale => {
  const base = locale.toLowerCase().split('-')[0];
  return isSupportedLocale(base) ? base : 'en';
};

export const getStoredLocale = (): SupportedLocale | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored && isSupportedLocale(stored) ? stored : null;
};

export const setStoredLocale = (locale: SupportedLocale) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
};

export const resolveBrowserLocale = (): SupportedLocale => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  // eslint-disable-next-line no-restricted-syntax
  for (const language of languages) {
    const base = language.toLowerCase().split('-')[0];
    if (isSupportedLocale(base)) {
      return base;
    }
  }

  return 'en';
};
