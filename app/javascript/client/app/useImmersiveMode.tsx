import React, { useEffect } from 'react'
import { NativeModules } from 'react-native'
import { useIsFocused } from '@react-navigation/core'
const { ImmersiveModule } = NativeModules

interface IImmersiveModule {
  enterImmersiveMode()
  exitMode()
}

const ImmersiveLib = ImmersiveModule as IImmersiveModule

/**
 * On window focus enter android immersive mode
 * Navbar and status bar will disapear unless user swipse up or left
 * https://developer.android.com/training/system-ui/immersive#java
 */
export default async function useImmersiveMode() {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      ImmersiveLib?.enterImmersiveMode()
    }
  }, [isFocused])
}