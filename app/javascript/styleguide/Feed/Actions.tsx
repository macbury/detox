import React, { useState, useCallback } from 'react'
import { editGroupPath, useNavigate } from '@detox/shared'
import { Group } from '@detox/store/models/Group'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import ActionButton, { RightActionButton } from '../Header/ActionButton'
import Menu from '../Menu'
import MenuButton from '../Menu/MenuButton'
import MenuSplit from '../Menu/MenuSplit'

const Container = styled.View`
  flex-direction: row;
`

export interface IActionsProp {
  loading: boolean;
  compact?: boolean;

  group?: Group

  markAllAsRead();
  refresh();
  sync();
}

export default function Actions(props : IActionsProp) {
  const navigation = useNavigate()
  const { t } = useTranslation()
  const [menuVisible, setMenuVisible] = useState(false)
  const {
    loading,
    compact,
    group,
    refresh,
    sync,
    markAllAsRead
  } = props

  const toggleMenu = useCallback(() => setMenuVisible(!menuVisible), [setMenuVisible, menuVisible])
  const hideMenu = useCallback(() => setMenuVisible(false), [setMenuVisible, menuVisible])

  const onRefreshPress = useCallback(() => {
    hideMenu()
    refresh()
  }, [hideMenu, refresh])

  const onSyncPress = useCallback(() => {
    hideMenu()
    sync()
  }, [sync, hideMenu])

  const onMarkAllAsRead = useCallback(() => {
    hideMenu()
    markAllAsRead()
  }, [hideMenu, markAllAsRead])

  const onEditGroup = useCallback(() => {
    navigation.navigate(editGroupPath(group.id))
    hideMenu()
  }, [hideMenu, group])

  return (
    <Container>
      {!compact && <ActionButton
        loading={loading}
        onPress={onRefreshPress}
        icon="refresh" />}
      <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<RightActionButton onPress={toggleMenu} icon="dots-vertical" />}>
        {compact && <MenuButton icon="refresh" onPress={onRefreshPress}>{t('screens.home.feed.actions.refresh')}</MenuButton>}
        <MenuButton icon="read" onPress={onMarkAllAsRead}>{t('screens.home.feed.actions.mark_all_as_read')}</MenuButton>
        <MenuButton icon="cloud-sync" onPress={onSyncPress}>{t('screens.home.feed.actions.sync')}</MenuButton>
        {group && <MenuSplit />}
        {group && <MenuButton icon="folder-pound" onPress={onEditGroup}>{t('screens.show_group.actions.edit')}</MenuButton>}
      </Menu>
    </Container>
  )
}