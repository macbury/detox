import React from 'react'
import { useStoreData } from '../core/useStoreData'

export function useLoggedIn() {
  return useStoreData(({ sessions }) => ({
    isLoggedIn: sessions.isLoggedIn,
    isLoading: sessions.isLoading
  }))
}

export function useIsAdmin() {
  return useStoreData(({ settings }) => ({
    isAdmin: settings.isAdmin
  })).isAdmin
}
