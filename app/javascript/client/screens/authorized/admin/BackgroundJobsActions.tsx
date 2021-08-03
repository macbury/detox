import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { RightActionButton } from '@detox/styleguide/Header/ActionButton'
import Menu from '@detox/styleguide/Menu'
import { useStoreData } from '@detox/store'
import MenuButton from '@detox/styleguide/Menu/MenuButton'

function useBackgroundJobs() {
  return useStoreData(({ screens: { admin: { backgroundJob } } }) => ({
    clearQueue: backgroundJob.clearQueue
  }))
}

export default function BackgroundJobsActions(props) {
  const { t } = useTranslation()
  const { clearQueue } = useBackgroundJobs()
  const [menuVisible, setMenuVisible] = useState(false)
  //const navigation = useNavigation()

  const {
  } = useBackgroundJobs()

  const toggleMenu = () => setMenuVisible(!menuVisible)
  const hideMenu = () => setMenuVisible(false)

  const onRetryAllPress = useCallback(() => {
    hideMenu()
    
  }, [hideMenu])

  const onClearFailedJobsPress = useCallback(() => {
    hideMenu()
    clearQueue()
  }, [hideMenu])


  return (
    <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<RightActionButton onPress={toggleMenu} icon="dots-vertical" />}>
      {/* <MenuButton icon="reload" onPress={onRetryAllPress}>{t('screens.admin.background_jobs.actions.run_all')}</MenuButton> */}
      <MenuButton icon="trash-can" onPress={onClearFailedJobsPress}>{t('screens.admin.background_jobs.actions.clear_all')}</MenuButton>
    </Menu>
  )
}