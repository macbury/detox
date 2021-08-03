import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useIsFocused, useScrollToTop } from '@react-navigation/native'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import Feed, { IFeedProps } from '@detox/styleguide/Feed'
import FeedActions from '@detox/styleguide/Feed/Actions'
import TitleWithBubbles from '@detox/styleguide/Header/TitleWithBubbles'
import Navbar from '@detox/styleguide/ui/Navbar'
import { useNavigate, channelPath, storyPath } from '@detox/shared'
import { useTheme } from 'styled-components/native'
import { useStackNavigation } from './context'

export interface IMobileFeedProps extends IFeedProps {
  totalCount: number;
  unreadCount: number;

  sync();
  markAllAsRead();
}

export default function MobileFeed(props : IMobileFeedProps) {
  const {
    isLoading,
    totalCount,
    unreadCount,
    items,
    refresh,
    sync,
    markAllAsRead,
    ...rest
  } = props

  const theme = useTheme()
  const { t } = useTranslation()
  const feedRef = useRef()
  const stackNavigation = useStackNavigation()
  const navigation = useNavigate()
  const isFocused = useIsFocused()

  useScrollToTop(feedRef)
  useModalNavBar()

  useLayoutEffect(() => {
    if (isFocused) {
      stackNavigation?.setOptions({
        headerRight: () => (<FeedActions compact={theme.device === 'mobile'} sync={sync} refresh={() => void refresh()} markAllAsRead={markAllAsRead} loading={isLoading} />),
        headerTitle: (props) => <TitleWithBubbles bubble={unreadCount} {...props} />
      })
    }
  }, [isLoading, sync, stackNavigation, totalCount, unreadCount, t, markAllAsRead, refresh, isFocused])

  return (
    <React.Fragment>
      <Feed
        onShowChannel={(channelId) => navigation.navigate(channelPath(channelId))}
        getLinkForStory={(story) => storyPath(story)}
        ref={feedRef}
        items={items}
        refresh={refresh}
        unreadCount={unreadCount}
        isLoading={isLoading}
        {...rest} />
      <Navbar />
    </React.Fragment>
  )
}