import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import DurationText from '../ui/DurationText'
import Text from '../form/Text'
import Fade from '../ui/Fade'
import { useAccentColor } from '../helpers/useColors'

export interface ITimeProps {
  visible: boolean
  isBuffering?: boolean
  accent?: string 
  positionMillis?: number
  durationMillis?: number
}

export interface IAccentProps {
  color: string
}

const Duration = styled(DurationText)`
  color: ${({ color } : IAccentProps) => color};
`

const Splitter = styled(Text)`
  color: ${({ color } : IAccentProps) => color};
  padding: 0 5px;
`

const Buffering = styled(ActivityIndicator)`
  margin-left: 10px;
`

const TimeContainer = styled(Fade)`
  flex-direction: row;
`

export default function PlaybackTime({ isBuffering, durationMillis, positionMillis, accent, visible } : ITimeProps) {
  const { color } = useAccentColor(accent)

  return (
    <TimeContainer visible={visible}>
      <Duration color={color}>{positionMillis || 0}</Duration>
      <Splitter color={color}>/</Splitter>
      <Duration color={color}>{durationMillis || -1}</Duration>
      {isBuffering && <Buffering size={16} color={color} />}
    </TimeContainer>
  )
}