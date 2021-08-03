import { useEffect, useCallback, useState } from 'react'
import { DiskStorage, CookiesStorage, useStoreData } from '@detox/store'

import OS from '@detox/shared/os'

function useBootStore() {
  return useStoreData(({ storage, cookies, refresh, setup }) => ({
    storage,
    cookies,
    refresh,
    setup
  }))
}

/**
 * Show logo ui while awaiting all stores to refresh
 */
export default function BootApp({ children }) {
  const [isReady, setReady] = useState(OS === "server")
  const { storage, cookies, refresh, setup } = useBootStore()

  const boot = useCallback(async () => {
    cookies.hydrate(await CookiesStorage.fetchHydration())
    storage.hydrate(await DiskStorage.fetchHydration())
    
    if (setup()) {
      setReady(true)
      await refresh()
    }
    
    setReady(true)
  }, [refresh, setup])

  useEffect(() => void boot(), [boot])

  return isReady ? children : null
}