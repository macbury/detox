import React, { useMemo } from 'react' 
import { DefaultTheme, ThemeProvider } from 'styled-components/native'
import { useMediaQuery } from 'react-responsive'
import { useSafeAreaInsets } from '../hooks/useSafeAreaInsets'
import { useIsPortrait } from '../helpers/useOrientation'
import OS from '@detox/shared/os'
export { BaseStyle } from './style'
export * from './variants'

export interface IAppThemeProviderProps {
  theme: DefaultTheme
  device?: string
  children: any
}

export default function AppThemeProvider({ children, theme, device } : IAppThemeProviderProps) {
  const isDesktop = OS === 'server' ? true : useMediaQuery({ minWidth: 1280 }) //TODO for server guess using header?
  const insets = useSafeAreaInsets()
  const isPortrait = useIsPortrait()

  const updatedTheme : DefaultTheme = useMemo(() => ({
    ...theme,
    insets,
    os: OS,
    device: device || isDesktop ? 'desktop' : 'mobile',
    orientation: isPortrait ? 'portrait' : 'landscape'
  }), [theme, isDesktop, insets, device])

  return (
    <ThemeProvider theme={updatedTheme}>
      {children}
    </ThemeProvider>
  )
}