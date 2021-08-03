import React from 'react'
import styled from 'styled-components/native'
import ActivityIndicator from './ActivityIndicator'

const LoadingBar = styled.View`
  min-height: 90px;
  justify-content: center;
`

export interface IFeedLoadingFooterProps {
  visible?: boolean
}

export default function FeedLoadingFooter({ visible } : IFeedLoadingFooterProps) {
  return (
    <LoadingBar>
      {visible && <ActivityIndicator size={32} />}
    </LoadingBar>
  )
}