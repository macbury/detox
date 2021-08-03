import React from 'react'
import styled from 'styled-components/native'
import { Media } from '@detox/store/AV'
import shadow from '../helpers/shadow'

const Container = styled.View`
  margin: 5px;
  width: 52px;
  height: 52px;
`

const Poster = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export interface IMiniMediaPlayerProps {
  media: Media
  compact: boolean
}

/**
 * 
*/
export default function MiniMediaPlayer({ media } : IMiniMediaPlayerProps) {
  console.log('media', media)
  
  return (
    <Container style={[shadow(4)]}>
      <Poster source={{ uri: media.poster.url }} />
    </Container>
  )
}