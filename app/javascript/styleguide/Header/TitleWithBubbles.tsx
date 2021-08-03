import React from 'react'
import styled from 'styled-components/native'
import { StackHeaderTitleProps } from '@react-navigation/stack'
import Text from '../form/Text'

const Container = styled.View`
  flex-direction: row;
  position: relative;
  max-width: 100px;
`

const TitleText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
`

const Bubble = styled(Text)`
  position: absolute;
  font-size: 12px;
  padding: 3px 8px;
  margin-left: 10px;
  top: -8px;
  right: 0px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  min-width: 23px;
  text-align: center;
`

export interface ITitleWithBubblesProps extends StackHeaderTitleProps {
  bubble?: number
}

export default function TitleWithBubbles({ bubble, children, ...props } : ITitleWithBubblesProps) {
  const bubbleVisible = bubble && bubble > 0
  const bubbleContent = bubble > 999 ? `999+` : bubble

  return (
    <Container {...props as any}>
      <TitleText>{children}</TitleText>
      { bubbleVisible ? <Bubble>{bubbleContent}</Bubble> : null}
    </Container>
  )
}