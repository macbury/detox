import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/native'
import FeedItem from '@detox/store/models/FeedItem'
import { TUrlProps } from '@detox/shared'
import TimeSlider from '../MediaControls/TimeSlider'
import GradientBackground from '../ui/GradientBackground'
import Text from '../form/Text'
import StoryLink from './StoryLink'
import StoryContent from './StoryContent'
import PlayPauseButton from '../MediaControls/PlayPauseButton'
import UniversalVolumeButton from '../MediaControls/UniversalVolumeButton'
import PlaybackTime from '../MediaControls/PlaybackTime'
import VideoView from '../Video/VideoView'
import CinemaModeButton from '../MediaControls/CinemaModeButton'
import Gap from '../MediaControls/Gap'

const HORIZONTAL_MARGIN = 15

const Slider = styled(TimeSlider)`
  position: absolute;
  bottom: ${({ theme }) => theme.os === 'web' ? '46px' : '36px'};
  left: ${({ theme }) => theme.os === 'web' ? '16px' : '3px'};
  right: ${({ theme }) => theme.os === 'web' ? '16px' : '3px'};
  z-index: 1;
`

const Controls = styled.View`
  z-index: 1;
  position: absolute;
  bottom: 5px;
  left: 8px;
  right: 12px;
  flex-direction: row;
  align-items: center;
`

const CardVideo = styled.View`
  margin: 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

const VideoPlayer = styled.View`
  overflow: hidden;
  border-radius: 6px;
  margin: 0px ${HORIZONTAL_MARGIN}px 15px ${HORIZONTAL_MARGIN}px;
`

const VideoTitle = styled(Text)`
  font-size: 16px;
  padding: 15px 15px;
  z-index: 1;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  color: #fff;
`

export interface IVideoDetailsProps {
  story: FeedItem
  width: number
  videoPath: TUrlProps
}


const VideoDetails = observer((props : IVideoDetailsProps) => {
  const { 
    videoPath, 
    story: { video, title, summary }, 
  } = props

  if (!video){
    return null
  }

  const width = props.width - HORIZONTAL_MARGIN * 2
  const accent = '#fff'

  return (
    <React.Fragment>
      <StoryLink to={videoPath}>
        <StoryContent content={summary} />
      </StoryLink>
      <CardVideo>
        <VideoPlayer>
          <VideoTitle>{title}</VideoTitle>
          <VideoView
            width={width}
            media={video.media} />
          <GradientBackground />
          <Slider
            key={width}
            accent={accent}
            durationMillis={video.media.durationMillis}
            positionMillis={video.media.positionMillis}
            isPlaying={video.media.isPlaying}
            pauseAsync={video.media.pause}
            setPositionAsync={video.media.setPositionAsync}
            playFromPositionAsync={video.media.playFromPositionAsync} />
          <Controls>
            <PlayPauseButton
              isLoaded={video.media.isLoaded || !video.media.isBuffering}
              isPlaying={video.media.isPlaying || video.media.isBuffering}
              pauseAsync={video.media.pause}
              playAsync={video.media.play}
              loadAsync={video.loadStream}
              accent={accent} />
            <UniversalVolumeButton
              accent={accent}
              volume={video.media.volume}
              setVolume={video.media.setVolume} />
            <PlaybackTime
              visible={true}
              isBuffering={video.media.isBuffering}
              positionMillis={video.media.positionMillis}
              durationMillis={video.media.durationMillis}
              accent={accent} />
            <Gap />
            <CinemaModeButton
              accent={accent}
              to={videoPath} />
          </Controls>
        </VideoPlayer>
      </CardVideo>
    </React.Fragment>
  )
})

export default VideoDetails
