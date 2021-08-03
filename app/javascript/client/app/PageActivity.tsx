import React from 'react'
import NextNProgress from 'nextjs-progressbar'
import { useTheme } from 'styled-components/native'

/**
 * Show activity indicator on top of the page
 */
export default function PageActivity() {
  const theme = useTheme()

  return (
    <NextNProgress
      color={theme.colors.primary}
      startPosition={0.3}
      stopDelayMs={200}
      height={3} />
  )
}