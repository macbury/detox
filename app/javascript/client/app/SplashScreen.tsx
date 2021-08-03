import React from 'react'
import styled from 'styled-components/native'

export const FullScreen = styled.View`
  flex: 1;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 1000;
`

export default function SplashScreen({ children }) {
  return (
    <React.Fragment>
      <FullScreen />
      {children}
    </React.Fragment>
  )
}