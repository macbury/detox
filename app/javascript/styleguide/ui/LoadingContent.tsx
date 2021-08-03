import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import ActivityIndictor from './ActivityIndicator'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  opacity: 0.3;
  min-height: 300px;
`

/**
 * Display centered activity indicator
 */
export default function LoadingContent(props) {
  const { device } = useTheme()
  const size = device == 'desktop' ? 64 : 48

  return (
    <Container {...props}>
      <ActivityIndictor size={size} />
    </Container>
  )
}