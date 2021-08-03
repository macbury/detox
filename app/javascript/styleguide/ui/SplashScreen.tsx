import React from 'react'
import styled from 'styled-components/native'

const LogoUri = require('../assets/rss.svg')

const Splash = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  pointer-events: none;
  opacity: 1;
  z-index: 1;
  transition: opacity .2s ease;
`

const Logo = styled.Image`

`

export interface ISplashScreenProps {
  visible: boolean
  children?: any
}

export default function SplashScreen({ visible, children } : ISplashScreenProps) {
  return (
    <React.Fragment>
      <Splash>
        <Logo source={{ uri: LogoUri }} />
      </Splash>
      {children}
    </React.Fragment>
  )
}