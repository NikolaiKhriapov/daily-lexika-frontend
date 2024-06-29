import { initReactI18next } from 'react-i18next';
import { resourcesEn } from '@daily-budget/utils/i18n/i18nResources_en';
import i18n from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    keySeparator: '.',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: resourcesEn,
      },
    },
  });

export default i18n;
