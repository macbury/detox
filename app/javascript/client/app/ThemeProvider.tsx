import React from 'react'
import AppThemeProvider from '@detox/styleguide/theme'
import { useStoreData } from '@detox/store'
import styled from 'styled-components/native'

const WindowBackground = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

function useThemeFromStore() {
  return useStoreData(({ settings }) => ({
    theme: settings.theme
  }))
}

/**
 * Finds what theme is set in MobX store and append it to theme provider
 * @param 
 */
export default function ThemeProvider({ children }) {
  const { theme } = useThemeFromStore()

  return (
    <AppThemeProvider theme={theme}>
      <WindowBackground>
        {children}
      </WindowBackground>
    </AppThemeProvider>
  )
}