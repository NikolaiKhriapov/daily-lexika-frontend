import { initReactI18next } from 'react-i18next';
import { resourcesEn } from '@utils/i18nResources_en';
import { resourcesRu } from '@utils/i18nResources_ru';
import { resourcesZh } from '@utils/i18nResources_zh';
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
      ru: {
        translation: resourcesRu,
      },
      zh: {
        translation: resourcesZh,
      },
    },
  });

export default i18n;
