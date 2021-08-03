import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Menu from '@detox/styleguide/Menu'
import MenuButton from '@detox/styleguide/Menu/MenuButton'
import ActionButton from '@detox/styleguide/Header/ActionButton'

export interface IVideoActionsProp {
}

export default function VideoActions(props : IVideoActionsProp) {
  const { t } = useTranslation()
  const [menuVisible, setMenuVisible] = useState(false)

  return null

  // const toggleMenu = () => setMenuVisible(!menuVisible)
  // const hideMenu = () => setMenuVisible(false)

  // return (
  //   <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<ActionButton color="#fff" onPress={toggleMenu} icon="dots-vertical" />}>
  //     <MenuButton icon="refresh" onPress={() => null}>{t('screens.home.feed.actions.refresh')}</MenuButton>
  //     <MenuButton icon="read" onPress={() => null}>{t('screens.home.feed.actions.mark_all_as_read')}</MenuButton>
  //     <MenuButton icon="cloud-sync" onPress={() => null}>{t('screens.home.feed.actions.sync')}</MenuButton>
  //   </Menu>
  // )
}