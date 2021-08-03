import React from 'react'
import styled from 'styled-components/native'

const Content = styled.View`
  flex: 1 1 auto;
  display: flex;
  background: ${(props) => props.theme.colors.background};
`

export default function Container({ children, ...props } : { children : any }) {
  return (
    <Content>
      {children}
    </Content>
  )
}