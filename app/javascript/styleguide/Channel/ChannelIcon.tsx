import React, { useMemo } from 'react'
import styled, { DefaultTheme } from 'styled-components/native'
import { ChannelKind } from '@detox/api'

const RssFallbackUri = require('../assets/rss.svg')

interface IIconProps {
  size: number
  theme?: DefaultTheme
}

const Icon = styled.Image`
  width: ${({ size } : IIconProps) => size}px;
  height: ${({ size } : IIconProps) => size}px;
  overflow: hidden;
  border-radius: 30px;
  background: ${({ theme }) => theme.dark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 30px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.dark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)'};
`

const IconContainer = styled.View`
  position: relative;
`

const UnreadIndicator = styled.View`
  position: absolute;
  bottom: -4px;
  right: -4px;
  border-radius: 50px;
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.colors.primary};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.cardBackground};
`

export type TChannel = {
  iconUrl?: string
  kind?: ChannelKind
}

export interface IChannelProps {
  channel: TChannel
  unread?: boolean
  large?: boolean
}

export default function ChannelIcon({ channel, unread, large, ...props } : IChannelProps) {
  const sourceUri = useMemo(() => {
    return channel?.iconUrl ? { uri: channel?.iconUrl } : RssFallbackUri
  }, [channel])
  const size = large ? 48 : 32

  return (
    <IconContainer style={{ width: size }} {...props}>
      <Icon
        size={size}
        defaultSource={RssFallbackUri}
        source={sourceUri} />
      {unread && <UnreadIndicator />}
    </IconContainer>
  )
}