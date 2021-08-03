import OS from '@detox/shared/os'
import React, { useState } from 'react'
import styled from 'styled-components/native'

const CollapsedTabsContainer = styled.View`
  background: ${({ theme }) => theme.colors.card};
  flex-direction: row;
  max-width: 720px;
  align-self: center;
  width: 100%;
  margin: 0 auto;
`

const ExpandedTabsContainer = styled.View`
  background: ${({ theme }) => theme.colors.card};
  flex-direction: row;
  max-width: 720px;
  width: 100%;
  align-self: center;
  padding-left: ${OS === 'web' ? 38 : 72}px;
`

export interface ITabsProps {
  expanded?: boolean
  children: any
}

export default function Tabs({ expanded, children } : ITabsProps) {
  const TabsContainer = expanded ? ExpandedTabsContainer : CollapsedTabsContainer

  return (
    <TabsContainer>
      {children}
    </TabsContainer>
  )
}