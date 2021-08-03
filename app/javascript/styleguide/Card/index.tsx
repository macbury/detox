import React, { PropsWithChildren } from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import generateShadowStyle from '../helpers/shadow'

const CardContainer = styled.View`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
`

export interface ICardProps extends PropsWithChildren<ViewProps> {
  shadow: number
  onMouseEnter?()
  onMouseLeave?()
  style?: any
  children?: any
}

export default function Card({ shadow, style, children, ...props } : ICardProps) {
  return (
    <CardContainer style={[style, generateShadowStyle(shadow)]} {...props}>
      {children}
    </CardContainer>
  )
}