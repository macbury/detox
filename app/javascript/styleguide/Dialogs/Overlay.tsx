import React from 'react'
import styled from 'styled-components/native'
import { KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'


const OverlayBackground = styled.ScrollView`
  background: ${({ theme }) => theme.colors.overlay};
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`

const OverlayInner = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
`

export default function Overlay({ children }) {
  const { height } = useWindowDimensions()

  return (
    <OverlayBackground contentContainerStyle={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <OverlayInner style={{ height }}>
          {children}
        </OverlayInner>
      </KeyboardAvoidingView>
    </OverlayBackground>
  )
}