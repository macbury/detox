import ScreenOrientation from "react-native-orientation-locker";
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { observer } from 'mobx-react-lite'

import Hoverable from '@detox/styleguide/form/Hoverable';
import TimeSlider from '@detox/styleguide/MediaControls/TimeSlider';
import GradientBackground from '@detox/styleguide/ui/GradientBackground';
import VideoView from '@detox/styleguide/Video/VideoView';
import useShowControls from '@detox/styleguide/Video/useShowControls';
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { useStoreData } from '@detox/store'
import Fade from '@detox/styleguide/ui/Fade'
import Text from '@detox/styleguide/form/Text'
import ChannelIcon from '@detox/styleguide/Channel/ChannelIcon'
import BackButton from '@detox/styleguide/Header/BackButton'
import { homePath } from '@detox/shared'
import PlayPauseButton from '@detox/styleguide/MediaControls/PlayPauseButton';
import UniversalVolumeButton from '@detox/styleguide/MediaControls/UniversalVolumeButton';
import PlaybackTime from '@detox/styleguide/MediaControls/PlaybackTime';
import Gap from "@detox/styleguide/MediaControls/Gap";
import FullscreenButton from "@detox/styleguide/MediaControls/FullscreenButton";

import useImmersiveMode from '../../../app/useImmersiveMode';
import VideoActions from './VideoActions'


const Controls = styled.View`
  z-index: 1;
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  flex-direction: row;
  align-items: center;
`

const Slider = styled(TimeSlider)`
  position: absolute;
  bottom: ${({ theme }) => theme.os === 'web' ? '57px' : '47px'};
  left: ${({ theme }) => theme.os === 'web' ? '20px' : '3px'};
  right: ${({ theme }) => theme.os === 'web' ? '20px' : '3px'};
  z-index: 1;
`

const Background = styled.View`
  background: #000001;
  flex: 1;
  flex-direction: row;
`

const StoryTitle = styled(Text)`
  padding: 10px 10px 10px 15px;
  font-size: 17px;
  color: #fff;
  flex: 1;
`

const Header = styled(Fade)`
  background: transparent;
  min-height: 60px;
  position: absolute;
  left: 0px;
  top: ${({ theme }) => theme.os === 'web' ? '10px' : '0px'};
  right: 0px;
  flex-direction: row;
  align-items: center;
`

const VideoContainer = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  align-items: center;
  justify-content: center;
`

const Hud = styled(Fade)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`

function useVideo() {
  return useStoreData(({ screens: { stories: { viewVideo } } }) => ({
    loading: viewVideo.isLoading || viewVideo.isRefreshing,
    media: viewVideo.media,
    story: viewVideo.story,
    video: viewVideo.video,

    fetch: viewVideo.fetch,
    clear: viewVideo.clear,
    changeStream: viewVideo.changeStream,
  }))
}

const PlayVideoScreen = observer(({ route: { params }, navigation } : StackScreenProps<any, any>) => {
  const [width, setWidth] = useState(0)
  const { storyId } = params
  const isFocused = useIsFocused()
  const accent = '#fff'

  const {
    media,
    loading,
    story,
    video,
    fetch,
    clear
  } = useVideo()

  useImmersiveMode()

  useEffect(() => {
    if (isFocused) {
      storyId ? fetch(storyId) : null
      ScreenOrientation.unlockAllOrientations()
    } else {
      ScreenOrientation.lockToPortrait()
      clear()
    }
  }, [storyId, isFocused])

  const {
    visible,
    showControls,
  } = useShowControls(media?.isPlaying)

  useEffect(() => {
    navigation.setOptions({
      title: story?.title || 'Loading...',
    })
  }, [story, navigation])

  if (loading || !media) {
    return null
  }

  return (
    <Hoverable onMouseMove={showControls}>
      <Background onTouchStart={showControls} onTouchMove={showControls} onTouchEnd={showControls}>
        <VideoContainer onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <VideoView 
            media={media}
            width={width} />
        </VideoContainer>

        <Hud visible={visible}>
          <GradientBackground />
          <Slider
            key={width}
            accent={accent}
            durationMillis={media.durationMillis}
            positionMillis={media.positionMillis}
            isPlaying={media.isPlaying}
            pauseAsync={media.pause}
            setPositionAsync={media.setPositionAsync}
            playFromPositionAsync={media.playFromPositionAsync} />

          <Controls>
            <PlayPauseButton
              isLoaded={media.isLoaded || !media.isBuffering}
              isPlaying={media.isPlaying || media.isBuffering}
              pauseAsync={media.pause}
              playAsync={media.play}
              loadAsync={video.loadStream}
              accent={accent} />
            <UniversalVolumeButton
              accent={accent}
              volume={media.volume}
              setVolume={media.setVolume} />
            <PlaybackTime
              visible={true}
              isBuffering={media.isBuffering}
              positionMillis={media.positionMillis}
              durationMillis={media.durationMillis}
              accent={accent} />

            <Gap />
            {media.isLoaded && <FullscreenButton
              accent={accent}
              onToggleFullScreen={media.toggleFullscreen} />}
          </Controls>
        </Hud>
    
        <Header visible={visible}>
          <BackButton goBackFallback={homePath()} color={accent} />
          <ChannelIcon channel={story?.channel} />
          <StoryTitle numberOfLines={1}>{story?.title || 'Loading...'}</StoryTitle>
          <VideoActions />
        </Header> 
      </Background>
    </Hoverable>
  )
}) as any

PlayVideoScreen.getScreenOptions = (t) => ({
  headerShown: false,
  title: 'Loading...'
})

export default PlayVideoScreen
