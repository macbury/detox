import React from 'react'

export const SidebarContext = React.createContext<number>(0);

export function useCurrentSidebarWidth() {
  const sidebarWidth = React.useContext(SidebarContext) || 0

  return sidebarWidth
}