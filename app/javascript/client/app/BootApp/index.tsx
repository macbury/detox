import React, { useEffect, useCallback } from 'react'
import { CookiesStorage } from '@detox/store/storage/cookies'
import { DiskStorage } from '@detox/store/storage/disk'
import { useStoreData } from '@detox/store'
import LoadingContent from '@detox/styleguide/ui/LoadingContent'
import * as SplashScreen from 'expo-splash-screen'

function useBootStore() {
  return useStoreData(({ cookies, sessions, isNone, hydrate, refresh, setup }) => ({
    instanceUrl: sessions.instanceUrl,
    sessions,
    cookies,
    isNone,
    hydrate,
    refresh,
    setup
  }))
}

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

/**
 * Show logo ui while awaiting all stores to refresh
 */
export default function BootApp({ children }) {
  const {
    sessions, // this is required for fetching newest instance url without rerun the whole boot callback
    instanceUrl,// this one is required for effect to change url in cookie storage
    cookies,
    isNone,

    refresh,
    hydrate,
    setup
  } = useBootStore()

  const cookieStorage = (cookies as CookiesStorage)

  const boot = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync()

    const data = await DiskStorage.fetchHydration()
    hydrate(data)

    console.log('Boot instance url', sessions.instanceUrl)
    await cookieStorage.changeInstanceUrl(sessions.instanceUrl)

    if (setup()) {
      await SplashScreen.hideAsync();
    }

    await refresh()
    await SplashScreen.hideAsync();
  }, [refresh, setup])

  useEffect(() => void boot(), [boot])

  useEffect(() => {
    if (instanceUrl) {
      (cookies as CookiesStorage).changeInstanceUrl(instanceUrl)
    }
  }, [instanceUrl])

  return isNone ? <LoadingContent /> : children
}