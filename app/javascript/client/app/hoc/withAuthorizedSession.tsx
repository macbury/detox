import React, { useLayoutEffect } from 'react'
import { useStoreData } from '@detox/store'
import { useRouting } from 'expo-next-react-navigation'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import OS from '@detox/shared/os'
import { signInPath } from '@detox/shared'

function useSession() {
  return useStoreData(({ sessions }) => ({
    isLoggedIn: sessions.isLoggedIn
  }))
}

export function withAuthorizedSession(Component) {
  return function (pageProps) {
    if (OS === 'server') {
      return <Component {...pageProps} />
    } else {
      const { isLoggedIn } = useSession()
      const navigation = useRouting()

      useLayoutEffect(() => {
        if (!isLoggedIn) {
          navigation.replace(signInPath())
        }
      }, [navigation])

      if (isLoggedIn) {
        return <Component {...pageProps} />
      } else {
        return <LoadingContent />
      }
    }
  }
}