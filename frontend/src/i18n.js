import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from './translate/en.json';
import translationEs from './translate/es.json';
import translationFr from './translate/fr.json';

let language = "en";  
if (navigator.language.search(`es`) >= 0) {
  language = "es";
}
if (navigator.language.search(`fr`) >= 0) {
  language = "fr";
}

const resources = {
  en: {
    translation: translationEn
  },
  es: {
    translation: translationEs
  },
  fr: {
    translation: translationFr
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;