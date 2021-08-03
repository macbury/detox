import { useCallback } from 'react'
import { useActionSheet as useOriginalActionSheet, ActionSheetOptions } from '@expo/react-native-action-sheet'
import { useTheme } from 'styled-components/native'

type TCallback = (i : number) => void

export default function useActionSheet() {
  const { showActionSheetWithOptions } = useOriginalActionSheet()
  const theme = useTheme()

  return useCallback((options : ActionSheetOptions, callback: TCallback) => {
    showActionSheetWithOptions({
      ...options,
      showSeparators: true,

      textStyle: {
        color: theme.colors.text,
      },
      titleTextStyle: {
        color: theme.colors.text,
      },
      messageTextStyle: {
        color: theme.colors.text,
      },
      separatorStyle: {
        backgroundColor: theme.colors.border
      },
      containerStyle: {
        paddingBottom: theme.insets.bottom,
        backgroundColor: theme.colors.background
      },
    }, callback)
  }, [showActionSheetWithOptions, theme])
}