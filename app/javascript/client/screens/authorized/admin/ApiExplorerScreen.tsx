import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useModalNavBar } from '@detox/styleguide/helpers/useSetNavBarColor'
import WebView from '@detox/styleguide/WebView'
import BackButton from '@detox/styleguide/Header/BackButton'
import { adminPath } from '@detox/shared'
import { useStoreData } from '@detox/store'
import { useIsFocused } from '@react-navigation/core'

const FullPageScreen = styled(WebView)`
  flex: 1;
`

function useApiExplorer() {
  return useStoreData(({ sessions }) => ({
    saveSharedAccessToken: sessions.saveSharedAccessToken,
    apiExplorerPath: sessions.apiExplorerPath
  }))
}

export default function ApiExplorerScreen() {
  const {
    saveSharedAccessToken,
    apiExplorerPath
  } = useApiExplorer()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      saveSharedAccessToken()
    }
  }, [isFocused, saveSharedAccessToken])

  useModalNavBar()

  return <FullPageScreen src={apiExplorerPath} />
}

ApiExplorerScreen.getScreenOptions = (t, mobile, theme) => ({
  title: t('screens.admin.api_explorer.title'),
  cardStyle: { backgroundColor: theme.colors.background },
  headerLeft: (props) => <BackButton goBackFallback={adminPath()} {...props} />,
})