import React from "react";
import styled from 'styled-components/native'
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'

import Logout from "./Logout";

import CollapseDrawerButton from "./CollapseDrawerButton";
import UserNavigationItems from "./UserNavigationItems";
import { DefaultTheme } from "styled-components/native";

export const DRAWER_COLLAPSED_WIDTH = 64
export const DRAWER_EXPANDED_WIDTH = 256

interface ICollapseProps {
  theme: DefaultTheme
  collapsed?: boolean
}

const DrawerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
  background-color: ${({ theme }) => theme.colors.card};
  overflow: hidden;
  width: ${({ collapsed } : ICollapseProps) => collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_EXPANDED_WIDTH}px;
  border-right-color: ${({ theme }) => theme.colors.border};
  border-right-width: 1px;
`

const ScrollView = styled(DrawerContentScrollView)`
  flex: 1;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: 1px;
`

const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

export interface IDesktopDrawerContentProps extends DrawerContentComponentProps<DrawerContentOptions> {
  collapsed?: boolean
  unreadStoriesCount?: string
  onToggleSidebar()
  onLogout()
  children: any
}

export default function DesktopDrawerContent(props : IDesktopDrawerContentProps) {
  const {
    children,
    collapsed,
    state,
    unreadStoriesCount,
    onToggleSidebar,
    onLogout,
    ...rest
  } = props

  const selectedRouteName = state?.routeNames[state?.index]

  return (
    <DrawerContainer collapsed={collapsed} {...rest}>
      <CollapseDrawerButton collapsed={collapsed} onPress={onToggleSidebar} title="detox" />
      <Options>
        <UserNavigationItems
          unreadStoriesCount={unreadStoriesCount}
          collapsed={collapsed}
          selectedRouteName={selectedRouteName} />
      </Options>
      <ScrollView>
        {children}
      </ScrollView>
      
      <Logout collapsed={collapsed} onLogout={onLogout} />
    </DrawerContainer>
  )
}