import React, { useCallback, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Button from './Button'

export interface IPlayPauseButtonProps {
  loadingData?: boolean
  accent?: string
  isPlaying?: boolean
  isLoaded?: boolean
  loadAsync?() : Promise<any>
  playAsync() : Promise<any>
  pauseAsync() : Promise<any>
}

export default function PlayPauseButton({ isPlaying, isLoaded, accent, loadingData, loadAsync, playAsync, pauseAsync } : IPlayPauseButtonProps) {
  const [loading, setLoading] = useState(false)

  const onPlayAction = useCallback(async () => {
    try {
      setLoading(true)
      if (loadAsync) {
        await loadAsync()
      }
      await playAsync()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }, [playAsync, loadAsync])

  const onPauseAction = useCallback(async () => {
    setLoading(true)
    await pauseAsync()
    setLoading(false)
  }, [pauseAsync, setLoading])

  const iconName = isPlaying ? 'pause' : 'play'
  const progress = !isLoaded || loading || loadingData

  return (
    <Button
      accent={accent}
      loading={progress}
      IconKind={Ionicons}
      icon={iconName}
      onPress={isPlaying ? onPauseAction : onPlayAction} />
  )
}