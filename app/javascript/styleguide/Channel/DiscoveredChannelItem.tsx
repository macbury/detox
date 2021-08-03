import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'
import { DiscoveredChannel } from '@detox/api'
import Card from '../Card'
import Header, {
  HeaderIcon,
  HeaderContent,
  HeaderTitle,
  HeaderSubTitle,
  HeaderAction
} from '../Card/Header'

export interface IDiscoveredChannelProps {
  channel: DiscoveredChannel
  onSubscribeActionClick(channel: DiscoveredChannel) : Promise<string | boolean | any>
}

const ChannelCard = styled(Card)`
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '50px' : '0px'};
  padding-left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  padding-right: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
`

export default function DiscoveredChannelItem({ channel, onSubscribeActionClick } : IDiscoveredChannelProps) {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)

  const subscribeToChannel = useCallback(async () => {
    setLoading(true)
    const channelId = await onSubscribeActionClick(channel)

    if (!channelId) {
      setLoading(false)
    }
  }, [onSubscribeActionClick])

  return (
    <ChannelCard shadow={2}>
      <Header>
        <HeaderIcon large channel={channel} unread={false} />
        <HeaderContent>
          <HeaderTitle>{channel.title}</HeaderTitle>
          <HeaderSubTitle numberOfLines={1}>{channel.source}</HeaderSubTitle>
        </HeaderContent>
        {!loading && <HeaderAction onPress={subscribeToChannel} name="plus" />}
        {loading && <ActivityIndicator color={theme.colors.primary} size={32} />}
      </Header>
    </ChannelCard>
  )
}