import { useCallback } from 'react'

export default function useExternalBrowserUrl() {
  return useCallback(async (url : string) => {
    window.open(url, '_blank')
  }, [])
}