import React, { useMemo, useState, useDebugValue } from 'react'
import styled from 'styled-components/native'
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

const PosterImageView = styled.ImageBackground`
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`

const CompactImageView = styled.ImageBackground`
  height: 100%;
`

export default function PosterImage({ width, poster, disableCompact = false } : IPosterProps) {
  const havePoster = !!poster
  const [loaded, setLoaded] = useState(false)
  const size = useSize(poster, width, disableCompact)
  
  if (!havePoster) {
    return null
  }

  const source = {
    uri: poster.url
  }

  const style = {
    width: size.width,
    height: size.height,
  }

  if (size.compact) {
    return (
      <CompactPosterContainer style={style}>
        <CompactImageView
          resizeMode="cover"
          onLoadEnd={() => setLoaded(true)}
          source={source}>
          <Blurhash
            visible={!loaded}
            hash={poster.blurhash}
            width={size.width}
            height={size.height} />
        </CompactImageView>
      </CompactPosterContainer>
    )
  }

  return (
    <PosterContainer style={style}>
      <PosterImageView
        resizeMode="cover"
        onLoadEnd={() => setLoaded(true)}
        source={source}>
        <Blurhash
          visible={!loaded}
          hash={poster.blurhash}
          width={size.width}
          height={size.height} />
      </PosterImageView>
    </PosterContainer>
  )
}