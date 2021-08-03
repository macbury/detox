import { useCallback } from 'react'
import { useTheme } from 'styled-components/native'
import * as WebBrowser from 'expo-web-browser'

export default function useExternalBrowserUrl() {
  const theme = useTheme()

  return useCallback(async (url : string) => {
    await WebBrowser.openBrowserAsync(url, {
      toolbarColor: theme.colors.card
    })
  }, [theme])
}