import React from 'react'
import { observer } from 'mobx-react-lite'
import styled, { useTheme } from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import FeedItem from '@detox/store/models/FeedItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StoryContent from './StoryContent'
import StoryLink from './StoryLink'
import PlayPauseButton from '../MediaControls/PlayPauseButton'
import UniversalVolumeButton from '../MediaControls/UniversalVolumeButton'
import PlaybackTime from '../MediaControls/PlaybackTime'
import TimeSlider from '../MediaControls/TimeSlider'
import Blurhash from '../ui/Blurhash'
import Text from '../form/Text'
import shadow from '../helpers/shadow'
import GradientBackground from '../ui/GradientBackground'
import Gap from '../MediaControls/Gap'
import CinemaModeButton from '../MediaControls/CinemaModeButton'

const HORIZONTAL_MARGIN = 15

const CardAudio = styled.View`
  margin: 0px;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

const AudioPlayer = styled.View`
  overflow: hidden;
  border-radius: 6px;
  margin: 0px ${HORIZONTAL_MARGIN}px 15px ${HORIZONTAL_MARGIN}px;
`

const CenteredPoster = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 0;
`

const CenteredPosterBackground = styled(CenteredPoster)`
  opacity: 0.3;
`

const PosterContainer = styled.View`
  border-radius: 7px;
  overflow: hidden;
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

const Poster = styled.Image`
  width: 100%;
  height: 100%;
`

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
  right: 10px;
  flex-direction: row;
  align-items: center;
`

const AudioTitle = styled(Text)`
  font-size: 16px;
  padding: 15px 15px;
  z-index: 1;
`

export interface IAudioDetailsProps {
  story: FeedItem
  width: number
  audioPath: TUrlProps
}

const AudioDetails = observer((props : IAudioDetailsProps) => {
  const { device, audioPoster } = useTheme()
  const {
    audioPath,
    story: { summary, audio, title },
  } = props

  if (!audio){
    return null
  }
  
  const width = props.width - HORIZONTAL_MARGIN * 2
  const { colors, blurhash } = audio?.poster || audioPoster
  
  const SIZE_FACTOR = device === 'mobile' ? 0.70 : 0.55
  const height = Math.round(width * SIZE_FACTOR)
  
  const posterStyle = [
    shadow(10),
    {
      width: height * 0.65,
      height: height * 0.65,
      backgroundColor: colors.background
    }
  ]

  return (
    <React.Fragment>
      <StoryLink to={audioPath}>
        <StoryContent content={summary} />
      </StoryLink>
      <CardAudio>
        <AudioPlayer style={{ height, backgroundColor: colors.background }}>
          <GradientBackground />
          <AudioTitle style={{ color: colors.accent }}>{title}</AudioTitle>
          <CenteredPosterBackground>
            <Blurhash
              visible={true}
              hash={blurhash} />
          </CenteredPosterBackground>
          <CenteredPoster>
            <PosterContainer style={posterStyle}>
              <PosterPlaceholder>
                <MaterialCommunityIcons
                  name="album"
                  size={height * 0.5}
                  color={colors.accent} />
              </PosterPlaceholder>
              <Poster source={audio.poster?.source} />
            </PosterContainer>
          </CenteredPoster>
          <Slider
            key={width}
            accent={colors.accent}
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
              accent={colors.accent} />
            <UniversalVolumeButton
              accent={colors.accent}
              volume={audio.media.volume}
              setVolume={audio.media.setVolume} />
            <PlaybackTime
              visible={true}
              isBuffering={audio.media.isBuffering}
              positionMillis={audio.media.positionMillis}
              durationMillis={audio.media.durationMillis}
              accent={colors.accent} />
            <Gap />
            <CinemaModeButton
              accent={colors.accent}
              to={audioPath} />
          </Controls>
        </AudioPlayer>
      </CardAudio>
    </React.Fragment>

  )
})

//https://mastodon.social/@Gargron/104429046400473860
export default AudioDetails