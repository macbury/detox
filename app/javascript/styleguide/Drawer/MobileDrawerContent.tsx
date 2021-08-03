import React from "react";
import styled from 'styled-components/native'
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import AccountContainer from "./AccountContainer";
import Logout from "./Logout";

import UserNavigationItems from "./UserNavigationItems";

const DrawerContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
  background-color: ${({ theme }) => theme.colors.card};
`

const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  padding-bottom: 10px;
  margin-bottom: 5px;
`

const ScrollView = styled(DrawerContentScrollView)`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`

export interface IMobileDrawerContentProps extends DrawerContentComponentProps<DrawerContentOptions> {
  username: string
  instanceUrl: string
  unreadStoryCount: string
  onLogout()
  children: any
}

export default function MobileDrawerContent(props : IMobileDrawerContentProps) {
  const {
    children,
    username,
    instanceUrl,
    unreadStoryCount,
    state,
    onLogout,
    ...rest
  } = props

  const selectedRouteName = state?.routeNames[state?.index]

  return (
    <DrawerContainer>
      <ScrollView {...rest}>
        <AccountContainer
          username={username}
          backendUrl={instanceUrl} />

        <Options>
          <UserNavigationItems
            unreadStoriesCount={unreadStoryCount}
            selectedRouteName={selectedRouteName} />
        </Options>

        {children}
      </ScrollView>
      <Logout onLogout={onLogout} />
    </DrawerContainer>
  )
}