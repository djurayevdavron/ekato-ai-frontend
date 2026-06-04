import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz/translation.json";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: uz,
    },
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },

  lng: localStorage.getItem("language") || "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;