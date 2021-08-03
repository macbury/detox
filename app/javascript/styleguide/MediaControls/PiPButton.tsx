import React, { useCallback } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import OS from '@detox/shared/os'
import Button from './Button'

export interface IPiPButtonProps {
  videoRef: React.MutableRefObject<HTMLVideoElement>
  accent: string
}

//https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
export default function PiPButton({ videoRef, accent } : IPiPButtonProps) {
  const onPiPScreen = useCallback(async () => {
    // const video = (videoRef?.current as any)?._nativeRef?.current?._video as any
    if (video) {
      // await videoRef.current.requestPictureInPicture()
    }
  }, [videoRef])

  if (OS !== "web") {
    return null
  }

  return (
    <Button
      accent={accent}
      IconKind={MaterialCommunityIcons}
      icon="picture-in-picture-bottom-right"
      onPress={onPiPScreen} />
  )
}