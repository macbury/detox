import React from 'react'
import { Blurhash } from 'react-native-blurhash'
import { IBlurhashProps } from './types'
import Fade from '../Fade'

export default function BlurhashWrapper({ visible, width, height, hash, ...props } : IBlurhashProps) {
  if (!hash) {
    return null
  }

  return (
    <Fade visible={visible}>
      <Blurhash
        style={{ width, height }}
        blurhash={hash}
        {...props}
      />
    </Fade>
  )
}
