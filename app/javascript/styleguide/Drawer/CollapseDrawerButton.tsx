import React from 'react'
import styled from 'styled-components/native'
import DrawerButton from './DrawerButton'

export const Button = styled(DrawerButton)`
  
`

export interface ICollapseDrawerButtonProps {
  collapsed?: boolean
  title: string
  onPress?() 
}

export default function CollapseDrawerButton(props : ICollapseDrawerButtonProps) {
  const {
    collapsed,
    title,
    onPress
  } = props

  return (
    <Button onPress={onPress} icon={collapsed ? 'menu' : 'backburger'}>
      {collapsed ? null : title}
    </Button>
  )
}

