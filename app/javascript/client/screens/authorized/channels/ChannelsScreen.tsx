import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, FlatList } from 'react-native'
import styled from 'styled-components/native'
import OS from '@detox/shared/os'
import { channelPath, editChannelPath, useNavigate } from '@detox/shared'
import { useStoreData } from '@detox/store'
import { DiscoveredChannel } from '@detox/api'
import CenteredScrollView from '@detox/styleguide/ui/CenteredScrollView'
import DiscoveredChannelItem from '@detox/styleguide/Channel/DiscoveredChannelItem'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import ChannelItem from '@detox/styleguide/Channel/ChannelItem'
import Navbar from '@detox/styleguide/ui/Navbar'
import ErrorMessageContent from '@detox/styleguide/ui/ErrorMessageContent'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import { useAsyncEffectOnFocus } from '@detox/styleguide/hooks/useAsyncEffect'
import { Channel } from '@detox/store/models/Channel'

import ChannelsActions from './ChannelsActions'
import { DiscoverChannelsHeader } from '../../../app/Channels/DiscoveryChannelsHeader'
import BurgerMenuWithUnreadCount from '../../../app/BurgerMenuWithUnreadCount'


const ChannelsContainer = styled.View`
  flex: 1; 
`

type Item = Channel | DiscoveredChannel

function useChannels() {
  return useStoreData(({ screens: { discoveryChannel } }) => ({
    channels: discoveryChannel.filteredChannels,
    discoveredChannels: discoveryChannel.discoveredChannels,
    loading: discoveryChannel.isLoading,
    isSearching: discoveryChannel.isSearching,
    nothingFound: discoveryChannel.nothingFound,
    query: discoveryChannel.query,

    refresh: discoveryChannel.refresh,
    subscribe: discoveryChannel.subscribe,
    clear: discoveryChannel.clear,
  }))
}

export default function ChannelsScreen() {
  const navigate = useNavigate()
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const { t } = useTranslation()
  const {
    loading,
    channels,
    query,
    discoveredChannels,

    refresh,
    subscribe,
    clear
  } = useChannels()

  useAsyncEffectOnFocus(refresh)
  useModalNavBar()

  const subscribeToChannel = useCallback(async (discoveredChannel : DiscoveredChannel) => {
    const channelId : any = await subscribe(discoveredChannel)

    if (channelId) {
      navigate.navigate(editChannelPath(channelId))
      clear()
    }
  }, [subscribe, clear])

  const items = useMemo(() => {
    const data = (discoveredChannels.length > 0 ? discoveredChannels : channels) as any

    return data.map((item : Item) => {
      if (item.__typename === 'Channel') {
        return <ChannelItem key={item.id} channel={item} channelPath={channelPath(item.id)} />
      } else {
        const discoveredChannel = item as DiscoveredChannel
        return <DiscoveredChannelItem key={item.source} channel={discoveredChannel} onSubscribeActionClick={subscribeToChannel} />
      }
    })
  }, [channels, discoveredChannels])


  // const ListEmptyComponent = useCallback(() => {
  //   const style = OS === "web" ? { minHeight: `${containerHeight}px` } : { height: Math.round(containerHeight) }
  //   return loading ? <LoadingContent style={style} /> : <ErrorMessageContent style={style} message={t('screens.home.discovery_channel.list.empty')} />
  // }, [containerHeight, loading])

  return (
    <ChannelsContainer onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
      <CenteredScrollView>
        {items}
      </CenteredScrollView>
      
      <Navbar />
    </ChannelsContainer>
  )
}

ChannelsScreen.getScreenOptions = (t, mobile : boolean) => ({
  headerShown: true,
  title: t('screens.home.channels.title'),
  headerLeft: (props) => mobile && <BurgerMenuWithUnreadCount {...props} />,
  headerTitle: () => <DiscoverChannelsHeader />,
  headerRight: (props) => <ChannelsActions {...props} />
})
