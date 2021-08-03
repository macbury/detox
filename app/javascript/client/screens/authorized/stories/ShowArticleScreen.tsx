import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Animated, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import OS from '@detox/shared/os'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

import { useStoreData } from '@detox/store'
import { useFullScreenBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import BackButton from '@detox/styleguide/Header/BackButton'
import Text from '@detox/styleguide/form/Text'
import ChannelIcon from '@detox/styleguide/Channel/ChannelIcon'
import ActivityIndicator from '@detox/styleguide/ui/ActivityIndicator'
import Navbar from '@detox/styleguide/ui/Navbar'
import { homePath } from '@detox/shared'

import ArticleReader from '../../../app/ArticleReader'
import ArticleActions from './ArticleActions'

const ChannelInfo = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  flex-shrink: 1;
`

const ChannelTitle = styled(Text)`
  font-size: 18px;
  margin-left: 10px;
  margin-right: 40px;
`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding-top: ${StatusBar.currentHeight}px;
  background: ${({ theme }) => theme.colors.articleBackground};
`

const Header = styled(Animated.View)`
  background: ${({ theme }) => theme.colors.articleBackground};
  min-height: 60px;
  position: absolute;
  left: 0px;
  right: 8px;
  top: ${StatusBar.currentHeight || 0}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

function useStory() {
  return useStoreData(({ screens: { stories: { viewArticle } } }) => ({
    loading: viewArticle.isLoading,
    channel: viewArticle.channel,
    story: viewArticle.story,
    poster: viewArticle.poster,
    article: viewArticle.article,
    articleUrl: viewArticle.articleUrl,

    fetch: viewArticle.fetch,
    clear: viewArticle.clear
  }))
}

const MAX_HEADER_OFFSET = -60
type ScrollDirection = 'down' | 'up'

export default function ShowArticleScreen({ route: { params }, navigation } : StackScreenProps<any, any>) {
  const { storyId } = params
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up')
  const animatedScrollY = useMemo(() => new Animated.Value(0), [])
  const animatedOpacity = useMemo(() => new Animated.Value(1), [])
  const isFocused = useIsFocused()

  const {
    poster,
    loading,
    story,
    channel,
    article,
    articleUrl,
    fetch,
    clear
  } = useStory()

  useFullScreenBar()

  useEffect(() => {
    if (isFocused && storyId) {
      fetch(storyId, OS === "web")
    } else {
      clear()
    }
  }, [storyId, isFocused])

  useEffect(() => {
    navigation.setOptions({
      title: story?.title || 'Story',
    })
    setScrollY(0)
    setScrollDirection('up')
    console.log('View article with:', articleUrl)
  }, [story, navigation])

  const calculateScroll = useCallback((nextY) => {
    if (nextY > scrollY) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }

    setScrollY(nextY)
  }, [setScrollY, scrollY])

  useEffect(() => {
    if (scrollDirection == 'down') {
      Animated.timing(animatedScrollY, {
        toValue: MAX_HEADER_OFFSET,
        duration: 250,
        useNativeDriver: true
      }).start()

      Animated.timing(animatedOpacity, {
        toValue: 0.0,
        duration: 250,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animatedScrollY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()

      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }, [scrollDirection])

  return (
    <Container>
      {loading && <ActivityIndicator size={64} />}
      {!loading && story && <ArticleReader poster={poster} story={story} article={article} onScroll={calculateScroll} articleUrl={articleUrl} />}

      <Header style={{ opacity: animatedOpacity, transform: [{ translateY: animatedScrollY }] }}>
        <BackButton goBackFallback={homePath()} />
        <ChannelInfo>
          <ChannelIcon channel={channel} />
          <ChannelTitle numberOfLines={1}>{channel?.name}</ChannelTitle>
        </ChannelInfo>
        <ArticleActions />
      </Header>
      <Navbar />
    </Container>
  )
}

ShowArticleScreen.getScreenOptions = (t) => ({
  headerLeft: (props : any) => <BackButton {...props} />,
  headerShown: false
})