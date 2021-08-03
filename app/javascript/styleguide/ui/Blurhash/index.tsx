import React from 'react'
import styled from 'styled-components/native'
import { Blurhash } from 'react-blurhash'
import { IBlurhashProps } from './types'
import Fade from '../Fade'

const FadeContainer = styled(Fade)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`

export default function BlurhashWrapper({ visible, hash, ...props } : IBlurhashProps) {
  if (!hash) {
    return null
  }

  return (
    <FadeContainer visible={visible}>
      <Blurhash
        {...props}
        width="100%"
        height="100%"
        hash={hash}
        resolutionX={32}
        resolutionY={32}
        punch={1} />
    </FadeContainer>
  )
}
