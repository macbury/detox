import React, { useState } from 'react'
import styled from 'styled-components/native'
import webStyled from 'styled-components'
import Blurhash from '../../ui/Blurhash'
import { useSize, IPosterProps } from './shared'

const PosterContainer = styled.View`
  overflow: hidden;
`

const CompactPosterContainer = styled.View`
  margin: 5px auto 15px auto;
  border-radius: 4px;
  overflow: hidden;
`

const MainImage = webStyled.img`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`

const CompactImage = webStyled.img`
  
`

const BlurhashContainer = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`

export default function PosterImage({ width, poster, disableCompact = false } : IPosterProps) {
  const havePoster = !!poster
  const [loaded, setLoaded] = useState(false)
  const size = useSize(poster, width, disableCompact)

  if (!havePoster) {
    return null
  }

  const containerStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
  }

  const style = {
    ...containerStyle,
    opacity: loaded ? 1.0 : 0.01,
  }

  if (size.compact) {
    return (
      <CompactPosterContainer style={containerStyle}>
        <CompactImage
          onLoad={() => setLoaded(true)}
          src={poster.url}
          style={style} />
        <BlurhashContainer>
          <Blurhash
            visible={!loaded}
            hash={poster.blurhash}
            width={size.width}
            height={size.height} />
        </BlurhashContainer>
      </CompactPosterContainer>
    )
  }

  return (
    <PosterContainer>
      <MainImage
        style={style}
        src={poster.url}
        onLoad={() => setLoaded(true)} />
      <BlurhashContainer>
        <Blurhash
          visible={!loaded}
          hash={poster.blurhash}
          width={size.width}
          height={size.height} />
      </BlurhashContainer>
    </PosterContainer>
  )
}