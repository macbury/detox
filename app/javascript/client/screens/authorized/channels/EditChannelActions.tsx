import React, { useState, useCallback } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { RightActionButton } from '@detox/styleguide/Header/ActionButton'
import Menu from '@detox/styleguide/Menu'
import MenuButton from '@detox/styleguide/Menu/MenuButton'
import { useStoreData } from '@detox/store'

function useEditChannels() {
  return useStoreData(({ screens: { editChannel } }) => ({
    unsubscribe: editChannel.unsubscribe,
    reimport: editChannel.reimport
  }))
}

export default function EditChannelActions(props) {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [menuVisible, setMenuVisible] = useState(false)

  const {
    unsubscribe,
    reimport
  } = useEditChannels()

  const toggleMenu = useCallback(() => setMenuVisible(!menuVisible), [setMenuVisible])
  const hideMenu = useCallback(() => setMenuVisible(false), [setMenuVisible])

  const onUnsubscribePress = useCallback(async () => {
    hideMenu()
    if (await unsubscribe()) {
      navigation.dispatch(StackActions.popToTop())
    }
  }, [hideMenu, unsubscribe])

  const onReimportPress = useCallback(async () => {
    hideMenu()
    if (await reimport()) {
      navigation.dispatch(StackActions.pop())
    }
  }, [hideMenu, reimport])

  return (
    <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<RightActionButton onPress={toggleMenu} icon="dots-vertical" />}>
      {/* <MenuButton icon="web" onPress={onUnsubscribePress}>{t('screens.home.edit_channel.actions.refresh_icon')}</MenuButton> */}
      <MenuButton icon="database-refresh" onPress={onReimportPress}>{t('screens.home.edit_channel.actions.reimport')}</MenuButton>
      <MenuButton icon="trash-can" onPress={onUnsubscribePress}>{t('screens.home.edit_channel.actions.unsubscribe')}</MenuButton>
    </Menu>
  )
}