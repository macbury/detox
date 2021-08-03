import React, { useEffect } from 'react'
import { useIsActiveState } from '../helpers/useAppState'
import { useStoreData } from '@detox/store'
import OS from '@detox/shared/os'

function useStoriesWatcher() {
  return useStoreData(({ sessions, screens: { stories } }) => ({
    isSignedIn: sessions.isSignedIn,
    watchForUpdates: stories.watchForUpdates,
    stopWatchingForUpdates: stories.stopWatchingForUpdates
  }))
}

/**
 * Start websocket connection, or close it depending on app state
 * For webapps always just connect, on native check app state
 * @returns
 */
export default function ObserveStories() {
  const isActive = (OS === 'android') ? useIsActiveState() : true

  const {
    watchForUpdates,
    stopWatchingForUpdates,
    isSignedIn
  } = useStoriesWatcher()

  if (OS === 'server') {
    return
  }

  useEffect(() => {
    if (isSignedIn && isActive) {
      watchForUpdates()
    }

    return () => {
      stopWatchingForUpdates()
    }
  }, [isActive, isSignedIn, watchForUpdates])

  return null
}