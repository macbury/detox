import { useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import { useIsFocused } from '@react-navigation/native'
import { changeBarColors } from 'react-native-immersive-bars'

function useSetAndroidColors(navColor : string, statusColor : string, dark : boolean) {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      console.log('Changed color of status bar to ', statusColor)
      console.log('Changed color of nav bar to ', navColor)
      console.log('Changed status bar icons are dark ', dark)
      changeBarColors(dark, statusColor, navColor)
    }
  }, [isFocused, navColor, statusColor, dark])
}

export function useDefaultNavBar() {
  const { colors, dark } = useTheme()

  useSetAndroidColors(
    colors.navigationBar,
    colors.card,
    dark
  )
}

export function useModalNavBar() {
  const { colors, dark } = useTheme()

  useSetAndroidColors(
    colors.background,
    colors.card,
    dark
  )
}

export function useFullScreenBar() {
  const { colors, dark } = useTheme()

  useSetAndroidColors(
    colors.background,
    colors.background,
    dark
  )
}

export function useFullScreenTransparentBar() {
  const { colors, dark } = useTheme()

  useSetAndroidColors(
    '#00000000',
    '#00000000',
    true
  )
}