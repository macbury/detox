import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

export interface ITitleProps {
  titleKey: string
}

export default function Title({ titleKey } : ITitleProps) {
  const { t } = useTranslation()

  return (
    <Head>
      <title>{t(titleKey)} - Detox</title>
    </Head>
  )
}
