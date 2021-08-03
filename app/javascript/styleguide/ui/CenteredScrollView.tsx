import OS from '@detox/shared/os'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollViewProps, ScrollView } from 'react-native'
import styled from 'styled-components/native'

const ScrollContainer = styled.ScrollView`
  width: 100%;
  min-width: 300px;
  display: flex;
  height: 100%;
  flex: 1;
`

const ScrollCenter = styled.View`
  max-width: ${({ theme }) => theme.device === 'desktop' ? '687px' : '480px'};
  margin: ${({ theme }) => theme.device === 'desktop' ? '0 auto' : '0px auto'};
  margin-top: ${({ theme }) => theme.device === 'desktop' ? '70px' : '10px'};
  margin-bottom: ${({ theme }) => theme.device === 'desktop' ? '70px' : '100px'};
  width: 100%;
  height: 100%;
  flex: 1;
`

interface ICenteredScrollViewProps extends ScrollViewProps {
  children?: any
}

const Scroll = React.forwardRef(function CenteredScrollView({ children, onLayout, ...props } : ICenteredScrollViewProps, forwardedRef : any) {
  const style = OS === 'android' ? {} : { flex: 1 }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollContainer {...props} ref={forwardedRef} style={style} contentContainerStyle={style}>
        <ScrollCenter onLayout={onLayout} style={style}>
          {children}
        </ScrollCenter>
      </ScrollContainer>
    </KeyboardAvoidingView>
  )
})

export default Scroll

export function renderCenteredScroll(props) {
  return <Scroll {...props}/>
}