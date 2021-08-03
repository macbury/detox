import NextI18Next from 'next-i18next';
import path from 'path'

const localePath = path.resolve('../api/locales')

const i18n = new NextI18Next({
  otherLanguages: ['en'],
  localePath
} as any)

export default i18n