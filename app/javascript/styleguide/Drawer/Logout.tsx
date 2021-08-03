import React from 'react'
import { useTranslation } from 'react-i18next'
import DrawerButton from './DrawerButton'

export interface ILogoutProps {
  onLogout()
  collapsed?: boolean
}

export default function Logout({ collapsed, onLogout } : ILogoutProps) {
  const { t } = useTranslation()
  return (
    <DrawerButton onPress={onLogout} icon="power-standby">{!collapsed && t('drawer.logout')}</DrawerButton>
  )
}