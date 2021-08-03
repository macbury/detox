import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RightActionButton } from '@detox/styleguide/Header/ActionButton'
import Menu from '@detox/styleguide/Menu'
import { useStoreData } from '@detox/store'
import MenuButton from '@detox/styleguide/Menu/MenuButton'


import useFilePicker from '../../../app/helpers/useFilePicker'

function useChannels() {
  return useStoreData(({ channels, screens: { importOpml } }) => ({
    refresh: channels.refresh,
    importOpml: importOpml.import
  }))
}

export default function ChannelActions(props) {
  const { t } = useTranslation()
  const openFileDialog = useFilePicker()
  const [menuVisible, setMenuVisible] = useState(false)
  //const navigation = useNavigation()

  const {
    refresh,
    importOpml
  } = useChannels()

  const toggleMenu = () => setMenuVisible(!menuVisible)
  const hideMenu = () => setMenuVisible(false)

  const onRefreshPress = () => {
    hideMenu()
    refresh()
  }

  const onImportOpml = async () => {
    hideMenu()
    const opml = await openFileDialog()
    importOpml(opml)
  }

  return (
    <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<RightActionButton onPress={toggleMenu} icon="dots-vertical" />}>
      <MenuButton icon="refresh" onPress={onRefreshPress}>{t('screens.home.channels.actions.refresh')}</MenuButton>
      <MenuButton icon="cloud-upload" onPress={onImportOpml}>{t('screens.home.channels.actions.import_opml')}</MenuButton>
    </Menu>
  )
}