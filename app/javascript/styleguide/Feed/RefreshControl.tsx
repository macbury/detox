import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { RefreshControl as NativeRefreshControl } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import shadow from '../helpers/shadow'
import Text from '../form/Text'

const FlatListContainer = styled(NativeRefreshControl)`
  
`

const NotificationTopContainer = styled.View`
  position: absolute;
  top: ${({ theme }) => theme.device == "mobile" ? 15 : 17}px;
  left: 0px;
  right: 0px;
  align-items: center;
`

const NotificationInner = styled.View`
  border-radius: 30px;
  overflow: hidden;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.primary};
`

const LabelButton = styled.TouchableOpacity`
  padding: 10px 5px 10px 20px;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
`

const Label = styled(Text)`
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
`

const CloseButton = styled.TouchableOpacity`
  padding: 10px 15px 10px 5px;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
`

export interface IRefreshControlProps {
  children?: any
  newStoriesCount?: number
  refreshing: boolean
  onGoToNewStories?()
  onRefresh?()
}

export default function RefreshControl({ onRefresh, onGoToNewStories, newStoriesCount, refreshing, children, ...props } : IRefreshControlProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const storyCount = newStoriesCount || 0
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    setVisible(storyCount > 0 && !refreshing)
  }, [storyCount, refreshing, setVisible])

  return (
    <FlatListContainer colors={[theme.colors.primary]} onRefresh={onRefresh} refreshing={refreshing} {...props}>
      {children}
      {visible && <NotificationTopContainer>
        <NotificationInner style={shadow(4)}>
          <LabelButton onPress={onGoToNewStories}>
            <MaterialCommunityIcons name="arrow-up" size={16} color="#fff" />
            <Label>{t('screens.home.feed.new_stories', { unread: newStoriesCount })}</Label>
          </LabelButton>
          <CloseButton onPress={() => setVisible(false)}>
            <MaterialCommunityIcons name="close" size={16} color="#fff" />
          </CloseButton>
        </NotificationInner>
      </NotificationTopContainer>}
    </FlatListContainer>
  )
}