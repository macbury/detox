import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/core'
import styled from 'styled-components/native'
import styledWeb from 'styled-components'
import { MediaVideo } from '@detox/store/AV'
import PosterImage from '../StoryItem/PosterImage'
import { useSize } from '../StoryItem/PosterImage/shared'

const VideoContainer = styled.View`
  overflow: hidden;
  background: #000001;
`

interface IElementContainerProps {
  width: number;
  height: number;
}

const ElementContainer = styledWeb.div`
  flex: 1;
  justify-items: center;
  align-content: center;
  video {
    width: ${({ width } : IElementContainerProps) => width}px;
    height:${({ height } : IElementContainerProps) => height}px;
  }
`

const PosterContainer = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-items: center;
  align-content: center;
`

export interface IVideoViewProps {
  media: MediaVideo
  width: number
}

const VideoView = observer(({ media, width, ...props } : IVideoViewProps) => {
  const isFocused = useIsFocused()
  const containerEl = useRef<HTMLDivElement>(null);

  const size = useSize(media, width, true)

  const showVideo = media?.isLoaded && isFocused

  useEffect(() => {
    const videoEl = showVideo ? media.getHandler() : null as any

    if (videoEl) {
      containerEl.current.appendChild(videoEl)

      return () => {
        if (media.isPlaying) {
          document.body.appendChild(videoEl)
        } else {
          if (containerEl.current.contains(videoEl)) {
            containerEl.current.removeChild(videoEl)
          }
        }
      }
    }
  }, [showVideo])

  return (
    <VideoContainer {...props} style={{ width: size.width + 'px', height: size.height + 'px' }}>
      <PosterContainer>
        {!media.isLoaded && <PosterImage width={width} poster={media.poster} disableCompact={true} />}
      </PosterContainer>

      <ElementContainer {...size} ref={containerEl}></ElementContainer>
    </VideoContainer>
  )
})

export default VideoView