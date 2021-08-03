import React, { useCallback } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import OS from '@detox/shared/os'
import Button from './Button'

export interface IFullscreenButtonProps {
  onToggleFullScreen()
  accent: string
}

/**
 * Show fullscreen button only on web
 * @param
 * @returns 
 */
export default function FullscreenButton({ onToggleFullScreen, accent } : IFullscreenButtonProps) {
  if (OS !== "web") {
    return null
  }

  return (
    <Button
      accent={accent}
      IconKind={MaterialCommunityIcons}
      icon="fullscreen"
      onPress={onToggleFullScreen} />
  )
}