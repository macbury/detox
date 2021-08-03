import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Animated } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import Slider from '@react-native-community/slider'
import Ionicons from '@expo/vector-icons/Ionicons'
import OS from '@detox/shared/os'

import { useAccentColor } from '../helpers/useColors'
import Hoverable from '../form/Hoverable'
import Button from './Button'

const VolumeContainer = styled.View`
  flex-direction: row;
  margin-right: 10px;
`

const EXPANDED_VOLUME_WIDTH = 70
const ANIMATED_DURATION = 200

const VolumeSliderContainer = styled(Animated.View)`
  
`

export interface IVolumeButtonProps {
  volume?: number
  accent?: string
  setVolume(volume: number)
}

function volumeToIcon(volume : number, muted: boolean) {
  if (muted) {
    return "md-volume-mute"
  } else if (volume > 0.75) {
    return "md-volume-high"
  } else if (volume > 0.4) {
    return "md-volume-medium"
  } else if (volume > 0.0) {
    return "md-volume-low"
  } else {
    return "md-volume-off"
  }
}

export default function UniversalVolumeButton({ volume, accent, setVolume, ...props } : IVolumeButtonProps) {
  const { color, trackColor } = useAccentColor(accent)
  const [localVolume, setLocalVolume] = useState<number>(volume || 1)
  const [muted, setMuted] = useState<boolean>(false)

  const animatedVolumeWidth = useMemo(() => new Animated.Value(0), [])
  const animatedVolumeOpacity = useMemo(() => new Animated.Value(0.0), [])

  const toggleMuted = useCallback(() => {
    setMuted((m) => !m)
  }, [setMuted])

  const onChangeVolume = useCallback((v) => {
    setLocalVolume(v)
    setMuted(v === 0.0)
  }, [setLocalVolume, setMuted])

  const showSlider = useCallback(() => {
    Animated.timing(animatedVolumeWidth, {
      toValue: EXPANDED_VOLUME_WIDTH,
      duration: ANIMATED_DURATION,
      useNativeDriver: true
    }).start()

    Animated.timing(animatedVolumeOpacity, {
      toValue: 1.0,
      duration: ANIMATED_DURATION,
      useNativeDriver: true
    }).start()
  }, [animatedVolumeWidth, animatedVolumeOpacity])

  const hideSlider = useCallback(() => {
    Animated.timing(animatedVolumeWidth, {
      toValue: 0,
      duration: ANIMATED_DURATION,
      useNativeDriver: true
    }).start()

    Animated.timing(animatedVolumeOpacity, {
      toValue: 0,
      duration: ANIMATED_DURATION,
      useNativeDriver: true
    }).start()
  }, [animatedVolumeWidth, animatedVolumeOpacity])

  useEffect(() => {
    setVolume && setVolume(muted ? 0 : localVolume)
  }, [localVolume, muted, setVolume])

  if (OS !== "web") {
    return null
  }

  return (
    <Hoverable onHoverIn={showSlider} onHoverOut={hideSlider} {...props}>
      <VolumeContainer>
        <Button
          accent={color}
          IconKind={Ionicons}
          icon={volumeToIcon(localVolume, muted)}
          onPress={toggleMuted} />
        <VolumeSliderContainer style={{ width: animatedVolumeWidth, opacity: animatedVolumeOpacity }}>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            disabled={muted}
            value={muted ? 0 : localVolume}
            step={0.05}
            maximumValue={1}
            vertical={true}
            onValueChange={onChangeVolume}
            thumbTintColor={color}
            minimumTrackTintColor={color}
            maximumTrackTintColor={trackColor} />
        </VolumeSliderContainer>
      </VolumeContainer>
    </Hoverable>
  )
}