import React from 'react'
import { observer } from 'mobx-react-lite'
import { useIsFocused } from '@react-navigation/core'
import styled from 'styled-components/native'
import { MediaVideo } from '@detox/store/AV'
import PosterImage from '../StoryItem/PosterImage'
import { useSize } from '../StoryItem/PosterImage/shared'
import RTCVideoView from './RTCVideoView'

const VideoContainer = styled.View`
  overflow: hidden;
  background: #000001;
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
  align-content: center;
`

export interface IVideoViewProps {
  media: MediaVideo
  width: number
}

const VideoView = observer(({ media, width, ...props } : IVideoViewProps) => {
  const isFocused = useIsFocused()
  const size = useSize(media, width, true)

  // poster size different from video size, get video size
  const showVideo = media?.isLoaded && isFocused
  const styleSize = { width: size.width, height: size.height }

  return (
    <VideoContainer {...props} style={styleSize}>
      <PosterContainer>
        {!media.isLoaded && <PosterImage width={width} poster={media.poster} disableCompact={true} />}
      </PosterContainer>

      {showVideo && <RTCVideoView mediaId={media.id} style={{ flex: 1 }} />}
    </VideoContainer>
  )
})

export default VideoView