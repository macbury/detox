import React from 'react'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Text from '../form/Text'
import Link from '../Link'

interface ISelectedProps {
  selected?: boolean
  collapsed?: boolean
  theme?: DefaultTheme
}

const Button = styled(Link)`
  display: flex;
  flex: 1;
  width: 100%;
`

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 13px 19px;
  min-height: 55px;
  background: ${({ selected, theme } : ISelectedProps) => selected ? theme.colors.inputBackground : 'transparent'};
`

const Title = styled(Text)`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  color: ${({ selected, theme } : ISelectedProps) => selected ? theme.colors.primary : theme.colors.text};
`

const InlineBubble = styled(Text)`
  font-size: 12px;
  padding: 3px 8px;
  margin-left: 10px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.card};
  min-width: 23px;
  text-align: center;
`

const FloatBubble = styled(Text)`
  position: absolute;
  font-size: 10px;
  padding: 3px 5px;
  top: 5px;
  right: 5px;
  color: #fff;
  background: ${({ theme, selected } : ISelectedProps) => theme.colors.primary};
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.card};
  min-width: 23px;
  text-align: center;
`

const Icon = styled(MaterialCommunityIcons)`
`

export interface IDrawerLinkProps {
  children?: any
  title?: string
  icon?: string | any
  selected?: boolean
  collapsed?: boolean
  to: TUrlProps
  bubble?: string
}

export default function DrawerLink({ bubble, collapsed, children, icon, to, selected, title } : IDrawerLinkProps) {
  const theme = useTheme()

  return (
    <Button to={to} title={title}>
      <ItemContainer selected={selected}>
        <Icon
          name={icon}
          color={selected ? theme.colors.primary : theme.colors.text}
          size={24} />
        {!collapsed && <Title numberOfLines={1} selected={selected}>{children}</Title>}
        {!collapsed && bubble?.length > 0 && <InlineBubble>{bubble}</InlineBubble>}
        {collapsed && bubble?.length > 0 && <FloatBubble selected={selected}>{bubble}</FloatBubble>}
      </ItemContainer>
    </Button>
  )
}