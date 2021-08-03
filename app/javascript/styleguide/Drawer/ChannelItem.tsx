import React from 'react'
import styled, { DefaultTheme } from 'styled-components/native'
import { Channel } from '@detox/api'
import { TUrlProps } from '@detox/shared'
import Text from '../form/Text'
import ChannelIcon from '../Channel/ChannelIcon'
import Link from '../Link'

interface ISelectedProps {
  selected?: boolean
  theme?: DefaultTheme
}

const ChannelLink = styled(Link)`
  flex: 1;
  width: 100%;
`

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 6px 16px;
  background: ${({ selected, theme } : ISelectedProps) => selected ? theme.colors.inputBackground : 'transparent'};
`

const ChannelName = styled(Text)`
  padding-left: 15px;
  font-size: 14px;
  color: ${({ selected, theme } : ISelectedProps) => selected ? theme.colors.primary : theme.colors.text};
`

export interface IChannelItemProps {
  channel: Channel
  selected?: boolean
  to: TUrlProps
  collapsed?: boolean
}

export default function ChannelItem({ collapsed, channel, to, selected } : IChannelItemProps) {
  return (
    <ChannelLink to={to} title={channel.name}>
      <ItemContainer selected={selected}>
        <ChannelIcon channel={channel} unread={false} />
        {!collapsed && <ChannelName numberOfLines={1} selected={selected}>{channel.name}</ChannelName>}
      </ItemContainer>
    </ChannelLink>
  )
}