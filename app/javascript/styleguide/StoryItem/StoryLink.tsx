import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import Link from '../Link'

export interface IStoryLinkProps {
  children: any
  to: TUrlProps
}

const NativeInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
`

const WebInnerContainer = styled(NativeInnerContainer)`
  flex: 1;
`

const InnerContainer = Platform.OS === 'web' ? WebInnerContainer : NativeInnerContainer

export default function StoryLink({ children, to, ...props } : IStoryLinkProps) {
  return (
    <Link to={to} {...props}>
      <InnerContainer>
        {children}
      </InnerContainer>
    </Link>
  )
}