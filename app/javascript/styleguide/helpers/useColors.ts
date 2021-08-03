import { useTheme } from 'styled-components/native';
import { useMemo } from 'react'
import Color from 'color'
import OS from '@detox/shared/os';

const OPACITY = OS === 'web' ? 0.3 : 0.9

export function useTrackColor(accent: string) {
  return useMemo(() => {
    return Color(accent).alpha(OPACITY).toString()
  }, [accent])
}

export function useAccentColor(accent?: string) {
  const { colors: { primary } } = useTheme()
  const color = accent || primary
  const trackColor = useTrackColor(color)
  
  return {
    color,
    trackColor
  }
}