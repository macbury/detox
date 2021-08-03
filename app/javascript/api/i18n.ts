import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import locales from './locales/native.json'

export default function init() {
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: true,
      initImmediate: true,

      react: {
        useSuspense: false
      },

      interpolation: {
        escapeValue: false
      }
    })

  Object.keys(locales).forEach((language) => {
    i18n.addResourceBundle(language, 'translation', locales[language])
  });

  return i18n
}