import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { TUrlProps } from '@detox/shared'
import BaseLink from '../Link'
import { useAccentColor } from '../helpers/useColors'

const LinkContainer = styled(BaseLink)`
  display: flex;
  border-radius: 90px;
  padding: 5px;
  margin-right: 0px;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
`

export interface ILinkProps {
  icon: string
  accent: string 
  loading?: boolean
  IconKind: any
  to: TUrlProps
}

export default function Link({ IconKind, icon, loading, accent = "#fff", to } : ILinkProps) {
  const { color } = useAccentColor(accent)
  
  return (
    <LinkContainer to={to}>
      {loading ? <ActivityIndicator size={24} color={color} /> : <IconKind name={icon} color={color} size={24} />}
    </LinkContainer>
  )
}