import React from 'react'
import { useStoreData } from '@detox/store'
import Notification from '@detox/styleguide/Notifications'

function useNotificationsStore() {
  return useStoreData(({ ui: { notifications } }) => ({
    current: notifications.current
  }))
}

/**
 * Display notifications
 */
export default function Notifications() {
  const {
    current
  } = useNotificationsStore()

  return <Notification notification={current} />
}