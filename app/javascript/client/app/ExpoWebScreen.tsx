import React from 'react'
import Header, { IHeaderProps } from '@detox/styleguide/Header';
import styled from 'styled-components/native'

export interface IExpoWebScreenProps {
  header: IHeaderProps
  Component: (props) => JSX.Element
}

const WebScreen = styled.View`
  flex: 1;
`

/**
 * Re implementation of react navigation screen to web version
 */
export default function ExpoWebScreen({ header, Component, ...props } : IExpoWebScreenProps) {
  return (
    <WebScreen>
      <Header {...header} {...props} />
      <Component {...props} />
    </WebScreen>
  )
}