import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './locales/en_translation';
import translationVN from './locales/vi_translation';
// the translation resources
const resources = {
  vi: {
    translation: translationVN,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // TODO: change when release
    compatibilityJSON: 'v3',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
