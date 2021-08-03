import React, { useEffect, useState, useCallback } from 'react'
import { useStoreData } from '@detox/store'
import { I18nextProvider } from 'react-i18next'
import initI18 from '@detox/api/i18n'

/**
 * Set i18next locale to match one from SettingsStore
 */
export default function Translations({ children }) {
  const [i18n, setI18n] = useState(null)
  const [translationKey, setTranslationKey] = useState('none')

  const { locale, timezoneName } = useStoreData(() => ({
    locale: 'en',
    timezoneName: 'Warsaw',
  }))

  const prepareI18n = useCallback(async () => {
    setI18n(await initI18())
  }, [setI18n]) 

  useEffect(() => {
    if (i18n) {
      i18n.changeLanguage(locale)
      setTranslationKey([locale, timezoneName].join('-'))
    }
  }, [locale, timezoneName, i18n, setTranslationKey])
  
  useEffect(() => void prepareI18n(), [prepareI18n])

  if (!i18n) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n} key={translationKey}>
      {children}
    </I18nextProvider>
  )
}