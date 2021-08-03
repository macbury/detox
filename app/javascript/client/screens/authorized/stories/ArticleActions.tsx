import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { observer } from "mobx-react-lite"

import ActionButton from '@detox/styleguide/Header/ActionButton'
import Menu from '@detox/styleguide/Menu'
import MenuButton from '@detox/styleguide/Menu/MenuButton'
import MenuSplit from '@detox/styleguide/Menu/MenuSplit'
import ActivityIndictor from '@detox/styleguide/ui/ActivityIndicator'
import { useStoreData } from '@detox/store'
import { channelPath, editChannelPath, useNavigate } from '@detox/shared'
import useExternalBrowserUrl from '@detox/styleguide/hooks/useExternalBrowserUrl'
import ShareAction from './ShareAction'

const LoadingContainer = styled.View`
  margin-right: 17px;
`

const ActionsContainer = styled.View`
  flex-direction: row;
`

function useArticle() {
  return useStoreData(({ screens: { stories: { viewArticle } } }) => ({
    loading: viewArticle.isLoading || viewArticle.isRefreshing,
    story: viewArticle.story,
    article: viewArticle.article,
    channel: viewArticle.channel,
    reload: viewArticle.reload,
    download: viewArticle.download
  }))
}

const ArticleActions = observer((props) => {
  const { t } = useTranslation()
  const [menuVisible, setMenuVisible] = useState(false)
  const navigation = useNavigate()
  const openURL = useExternalBrowserUrl()

  const {
    loading,
    story,
    article,
    reload,
    download
  } = useArticle()

  const toggleMenu = () => setMenuVisible(!menuVisible)
  const hideMenu = () => setMenuVisible(false)

  const onRefreshPress = useCallback(() => {
    reload()
    hideMenu()
  }, [hideMenu, reload])

  const onDownloadPress = useCallback(() => {
    download()
    hideMenu()
  }, [hideMenu, download])

  const onToggleRead = useCallback(() => {
    hideMenu()
    story.toggleRead()
  }, [hideMenu, story])

  const onToggleFavorite = useCallback(() => {
    hideMenu()
    story.toggleFavorite()
  }, [hideMenu, story])

  const onShowChannel = useCallback(() => {
    navigation.navigate(channelPath(story.channel.id))
    hideMenu()
  }, [hideMenu, navigation, story])

  const onEditChannel = useCallback(() => {
    navigation.navigate(editChannelPath(story.channel.id))
    hideMenu()
  }, [hideMenu, navigation, story])

  const onOpenOriginal = useCallback(() => {
    story.markAsRead()
    openURL(story.permalink)
    hideMenu()
  }, [hideMenu, story?.permalink])

  const onShowComments = useCallback(() => {
    story.markAsRead()
    openURL(article.commentsUrl)
    hideMenu()
  }, [hideMenu, article?.commentsUrl, story])

  if (loading || !story) {
    return (
      <LoadingContainer {...props}>
        <ActivityIndictor size={24} />
      </LoadingContainer>
    )
  }

  return (
    <ActionsContainer {...props}>
      <ShareAction permalink={story?.permalink} />
      <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<ActionButton onPress={toggleMenu} icon="dots-vertical" />}>
        <MenuButton icon={story?.isRead ? 'cancel' : 'check'} onPress={onToggleRead}>{t(story?.isRead ? "story.actions.unread" : "story.actions.read")}</MenuButton>
        <MenuButton icon={story?.isFavorite ? "cards-heart" : 'heart-outline'} onPress={onToggleFavorite}>{t('story.actions.favorite')}</MenuButton>
        <MenuButton icon="comment" disabled={!article?.commentsUrl} onPress={onShowComments}>{t('story.actions.comments')}</MenuButton>
        <MenuButton icon="open-in-new" onPress={onOpenOriginal}>{t('story.actions.original')}</MenuButton>
        <MenuSplit />
        <MenuButton icon="cloud-download" onPress={onDownloadPress}>{t('screens.home.articles.actions.download')}</MenuButton>
        <MenuButton icon="refresh" onPress={onRefreshPress}>{t('screens.home.articles.actions.refresh')}</MenuButton>
        <MenuSplit />
        <MenuButton icon="database-edit" onPress={onEditChannel}>{t('screens.home.articles.actions.channel.edit')}</MenuButton>
        <MenuButton icon="palette-swatch" onPress={onShowChannel}>{t('screens.home.articles.actions.channel.show')}</MenuButton>
      </Menu>
    </ActionsContainer>
  )
})

export default ArticleActions