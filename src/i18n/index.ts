import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { de } from '@/i18n/resources/de';
import { en } from '@/i18n/resources/en';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'de',
  fallbackLng: 'de',
  resources: {
    de,
    en,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
