import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { observer } from 'mobx-react-lite'
import { StackScreenProps } from '@react-navigation/stack'
import { useStoreData } from '@detox/store'
import { homePath } from '@detox/shared'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFullScreenTransparentBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import Text from '@detox/styleguide/form/Text'
import { useIsFocused } from '@detox/styleguide/helpers/useIsFocused'
import BackButton from '@detox/styleguide/Header/BackButton'
import Blurhash from '@detox/styleguide/ui/Blurhash'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import GradientBackground from '@detox/styleguide/ui/GradientBackground'
import TimeSlider from '@detox/styleguide/MediaControls/TimeSlider'
import shadow from '@detox/styleguide/helpers/shadow'
import PlayPauseButton from '@detox/styleguide/MediaControls/PlayPauseButton'
import PlaybackTime from '@detox/styleguide/MediaControls/PlaybackTime'
import UniversalVolumeButton from '@detox/styleguide/MediaControls/UniversalVolumeButton'

const Background = styled.View`
  background: #000001;
  flex: 1;
  flex-direction: row;
`

const Header = styled.View`
  background: transparent;
  min-height: 60px;
  position: absolute;
  left: 0px;
  top: ${({ theme }) => theme.os === 'web' ? '10px' : theme.insets.top};
  right: 0px;
  flex-direction: row;
  align-items: center;
`

const BackgroundBlur = styled.View`
  opacity: 0.3;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 0;
`

const PosterHeader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  position: absolute;
  top: ${({ theme }) => 70 + theme.insets.top}px;
  bottom: ${({ theme }) => (theme.device === 'desktop' ? 66 : 80) + theme.insets.bottom}px;
  right: 0px;
  left: 0px;
`

const PosterContainer = styled.View`
  border-radius: 7px;
  overflow: hidden;
  width: 512px;
  height: 512px;
`

const Poster = styled.Image`
  width: 100%;
  height: 100%;
`

const Slider = styled(TimeSlider)`
  position: absolute;
  bottom: ${({ theme }) => (theme.device === 'desktop' ? 66 : 56) + theme.insets.bottom}px;
  left: ${({ theme }) => theme.device === 'desktop' ? '90px' : '25px'};
  right: ${({ theme }) => theme.device === 'desktop' ? '90px' : '25px'};
  z-index: 1;
`

const StoryTitle = styled(Text)`
  text-align: center;
  margin-top: 20px;
  padding: 0px 20px;
  font-size: 18px;
`

const ChannelName = styled(Text)`
  text-align: center;
  padding: 5px 20px;
`

const Controls = styled.View`
  z-index: 1;
  position: absolute;
  bottom: ${({ theme }) => (theme.device === 'desktop' ? 20 : 15) + theme.insets.bottom};
  left: ${({ theme }) => theme.device === 'desktop' ? '90px' : '20px'};
  right: ${({ theme }) => theme.device === 'desktop' ? '90px' : '20px'};
  flex-direction: row;
  align-items: center;
`

const PosterPlaceholder = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  align-items: center;
  justify-content: center;
`

function useAudio() {
  return useStoreData(({ screens: { stories: { viewAudio } } }) => ({
    loading: viewAudio.isLoading || viewAudio.isRefreshing,
    media: viewAudio.media,
    story: viewAudio.story,
    audio: viewAudio.audio,

    fetch: viewAudio.fetch,
    clear: viewAudio.clear
  }))
}

const PlayAudioScreen = observer(({ route: { params: { storyId } }, navigation } : StackScreenProps<any, any>) => {
  const isFocused = useIsFocused()
  const theme = useTheme()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const {
    loading,
    story,
    audio,
    fetch,
    clear
  } = useAudio()

  useFullScreenTransparentBar()

  useEffect(() => {
    if (isFocused) {
      storyId ? fetch(storyId) : null
    } else {
      clear()
    }
  }, [storyId, isFocused])

  useEffect(() => {
    navigation.setOptions({
      title: story?.title || 'Loading...',
    })
  }, [story, navigation]) // TODO: move this into a hook

  if (loading || !audio) {
    return <LoadingContent />
  }

  const { colors, blurhash } = audio?.poster || theme.audioPoster

  const accent = colors.accent
  const background = colors.background
  const widthOrHeight = theme.orientation === 'landscape' ? size.height : size.width

  const posterStyle = [
    shadow(10),
    {
      width: widthOrHeight * 0.75,
      height: widthOrHeight * 0.75,
      backgroundColor: background
    }
  ]

  return (
    <Background style={{ backgroundColor: background }}>
      <BackgroundBlur>
        <Blurhash visible={true} hash={blurhash} />
      </BackgroundBlur>
      <GradientBackground />

      <PosterHeader onLayout={(e) => setSize(e.nativeEvent.layout)}>
        <PosterContainer style={posterStyle}>
          <PosterPlaceholder>
            <MaterialCommunityIcons
              name="album"
              size={widthOrHeight * 0.5}
              color={colors.accent} />
          </PosterPlaceholder>
          <Poster source={audio.poster?.source} />
        </PosterContainer>
        <StoryTitle style={{ color: accent }}>{story.title}</StoryTitle>
        <ChannelName style={{ color: accent }}>{story.channel.name}</ChannelName>
      </PosterHeader>

      <Slider
        key={`${size?.width}x${size.height}`}
        accent={accent}
        durationMillis={audio.media.durationMillis}
        positionMillis={audio.media.positionMillis}
        isPlaying={audio.media.isPlaying}
        pauseAsync={audio.media.pause}
        setPositionAsync={audio.media.setPositionAsync}
        playFromPositionAsync={audio.media.playFromPositionAsync} />
      
      <Controls>
        <PlayPauseButton
          isLoaded={!audio.media.isBuffering}
          isPlaying={audio.media.isPlaying || audio.media.isBuffering}
          pauseAsync={audio.media.pause}
          playAsync={audio.media.play}
          loadAsync={audio.loadStream}
          accent={accent} />
        <UniversalVolumeButton
          accent={accent}
          volume={audio.media.volume}
          setVolume={audio.media.setVolume} />
        <PlaybackTime
          visible={true}
          isBuffering={audio.media.isBuffering}
          positionMillis={audio.media.positionMillis}
          durationMillis={audio.media.durationMillis}
          accent={accent} />
      </Controls>

      <Header>
        <BackButton goBackFallback={homePath()} color={accent} />
      </Header>
    </Background>
  )
}) as any

PlayAudioScreen.getScreenOptions = (t, theme) => ({
  cardStyle: { backgroundColor: theme.colors.background },
  headerShown: false,
  title: 'Loading...'
})

export default PlayAudioScreen
