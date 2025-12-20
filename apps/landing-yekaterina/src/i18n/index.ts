import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { resourcesEn } from './resources_en';
import { resourcesRu } from './resources_ru';

i18n.use(initReactI18next).init({
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
    ru: {
      translation: resourcesRu,
    },
  },
});

export default i18n;
