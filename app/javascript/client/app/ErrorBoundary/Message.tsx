import React, { useEffect } from 'react'
import { Button, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
`

const Inner = styled.View`
  align-items: center;
`

export interface IMessageProps {
  error: Error
  children?: any
  onRestart()
}

export default function Message({ error, onRestart, children } : IMessageProps) {
  const e = error

  if (e) {
    return (
      <Container>
        <Inner>
          <Text>Oops!</Text>
          <Text>There's an error</Text>
          <Text numberOfLines={10}>{e?.message?.toString()}</Text>
          <Button onPress={onRestart} title="Restart app" />
        </Inner>
      </Container>
    )
  }

  return children
}