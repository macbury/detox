import OS from '@detox/shared/os'
import React, { useState, useMemo } from 'react'
import styled from 'styled-components/native'
import webStyled from 'styled-components'
import Blurhash from '../ui/Blurhash'

const ImageContainer = styled.View`
  overflow: hidden;
`

const MainImage = webStyled.img`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
`

const BlurhashContainer = styled.View`
  position: absolute;
`

export interface IImageProps {
  src: string
  blurhash: string
  width: number
  height: number
  alt?: string
}

export default function Image({ src, blurhash, width, height, ...props } : IImageProps) {
  const [loaded, setLoaded] = useState(OS === "server")
  const [containerWidth, setContainerWidth] = useState(width)

  const size = useMemo(() => {
    const scale = containerWidth / width
    return {
      width: containerWidth,
      height: height * scale
    }
  }, [containerWidth, width, height])

  return (
    <ImageContainer onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)} {...props}>
      <MainImage
        src={src}
        style={{ width, opacity: loaded ? 1.0 : 0.01 }}
        onLoad={() => setLoaded(true)} />
      <BlurhashContainer>
        <Blurhash
          visible={!loaded}
          hash={blurhash}
          width={size.width}
          height={size.height} />
      </BlurhashContainer>
    </ImageContainer>
  )
}