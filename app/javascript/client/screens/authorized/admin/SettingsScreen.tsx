import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '@detox/store'
import { useIsFocused } from '@react-navigation/native'
import { adminBackgroundJobsPath, adminApiExplorerPath } from '@detox/shared'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import CenteredScrollView from '@detox/styleguide/ui/CenteredScrollView'
import Option from '@detox/styleguide/Settings/Option'
import Navbar from '@detox/styleguide/ui/Navbar'
import BurgerMenuWithUnreadCount from '../../../app/BurgerMenuWithUnreadCount'

export function useSettingsStore() {
  return useStoreData(({ settings, screens: { admin } }) => ({
    themeName: settings.themeName,
    settings: admin.settings.all,

    changeTheme: settings.changeTheme,
    refresh: admin.settings.refresh,
    openSettingEditor: admin.settings.openSettingEditor,
  }))
}

export default function SettingsScreen() {
  const isFocused = useIsFocused()
  const { t } = useTranslation()
  const {
    refresh,
    openSettingEditor,
    changeTheme,
    settings,
    themeName
  } = useSettingsStore()

  useEffect(() => {
    if (isFocused) {
      refresh()
    }
  }, [isFocused])

  useModalNavBar()

  const options = useMemo(() => (
    settings.map((setting) => {
      const iconName = t(`screens.admin.settings.options.${setting.key}.icon`) // small trick to use translations for icons

      return (
        <Option
          key={setting.key}
          onPress={() => openSettingEditor(setting)}
          value={setting.value}
          title={`screens.admin.settings.options.${setting.key}.title`}
          description={`screens.admin.settings.options.${setting.key}.description`}
          icon={iconName} />
      )
    })
  ), [settings, t, openSettingEditor])

  return (
    <React.Fragment>
      <CenteredScrollView>
        <Option
          key="theme"
          onPress={() => changeTheme()}
          title="screens.admin.settings.options.theme.title"
          description="screens.admin.settings.options.theme.description"
          icon="theme-light-dark"
          value={themeName} />
        <Option
          key="default_background_jobs"
          title="screens.admin.background_jobs.title"
          description="screens.admin.background_jobs.description"
          icon="chemical-weapon"
          to={adminBackgroundJobsPath()} />
        <Option
          key="default_api_explorer"
          title="screens.admin.api_explorer.title"
          description="screens.admin.api_explorer.description"
          icon="api"
          to={adminApiExplorerPath()} />
        {options}
      </CenteredScrollView>
      <Navbar />
    </React.Fragment>
  )
}

SettingsScreen.getScreenOptions = (t, mobile) => ({
  title: t('screens.admin.settings.title'),
  headerShown: mobile,
  headerLeft: (props) => mobile && <BurgerMenuWithUnreadCount />
})