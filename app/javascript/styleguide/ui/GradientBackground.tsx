import React from 'react'
import styled from 'styled-components/native'
import OS from '@detox/shared/os'

const VideoGradientImage = require('../assets/video_gradient.png')

const Gradient = styled.Image`
  flex: 1;
  opacity: 0.7;
  height: 100%;
  width: 100%;
  position: absolute;
`

export default function GradientBackground(props) {
  const source = OS === "web" ? { uri: VideoGradientImage } : VideoGradientImage

  return (
    <Gradient
      resizeMode="stretch"
      source={source}
      {...props} />
  )
}