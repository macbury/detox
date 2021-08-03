import React, { useCallback, useRef } from 'react'
import Slider from '@react-native-community/slider'
import styled from 'styled-components/native'
import { useAccentColor } from '../helpers/useColors'

const PlaybackSliderContainer = styled.View`
  align-items: stretch;
  justify-content: center;
  flex: 1;
  min-height: 30px;
`

export interface ITimeSliderProps {
  accent: string
  isPlaying: boolean
  loading?: boolean
  positionMillis: number
  durationMillis: number
  pauseAsync() : Promise<any>
  playFromPositionAsync(positionMillis : number) : Promise<any>
  setPositionAsync(positionMillis : number) : Promise<any>
}

type TSeekState = {
  enabled: boolean
  shouldPlayAtEndOfSeek: boolean
  positionMillis: number
}

export default function TimeSlider(props : ITimeSliderProps) {
  const {
    accent,
    isPlaying,
    positionMillis,
    durationMillis,
    loading,
    pauseAsync,
    playFromPositionAsync,
    setPositionAsync,
    ...restProps
  } = props

  const { color, trackColor } = useAccentColor(accent)
  const seekRef = useRef<TSeekState>({ enabled: false, shouldPlayAtEndOfSeek: false, positionMillis: 0 })

  const onSeekStarted = useCallback(async (value) => {
    const seek = seekRef.current
    seek.positionMillis = value

    if (!seek.enabled) {
      seek.enabled = true
      seek.shouldPlayAtEndOfSeek = isPlaying
      await pauseAsync()
    }
  }, [pauseAsync, seekRef, isPlaying])

  const onSeekCompleted = useCallback(async (value) => {
    const seek = seekRef.current
    seek.enabled = false
    seek.positionMillis = value

    if (seek.shouldPlayAtEndOfSeek) {
      await playFromPositionAsync(seek.positionMillis)
    } else {
      await setPositionAsync(value)
    }
  }, [playFromPositionAsync, setPositionAsync, seekRef])

  const onSeekValueChanged = useCallback(async (value) => {
    const seek = seekRef.current
    seek.positionMillis = value
  }, [seekRef])

  if (loading) {
    return (
      <PlaybackSliderContainer {...restProps}></PlaybackSliderContainer>
    )
  }

  return (
    <PlaybackSliderContainer {...restProps}>
      <Slider
        style={{ flex: 1 }}
        disabled={loading}
        minimumValue={0}
        value={positionMillis}
        maximumValue={Math.max(durationMillis || 0, 1)}
        thumbTintColor={color}
        onSlidingStart={onSeekStarted}
        onValueChange={onSeekValueChanged}
        onSlidingComplete={onSeekCompleted}
        minimumTrackTintColor={color}
        maximumTrackTintColor={trackColor} />
    </PlaybackSliderContainer>
  )
}