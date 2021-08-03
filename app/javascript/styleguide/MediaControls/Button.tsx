import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import Touchable from '../form/Touchable'
import { useAccentColor } from '../helpers/useColors'

const ButtonContainer = styled(Touchable)`
  border-radius: 90px;
  padding: 5px;
  margin-right: 0px;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
`

export interface IButtonProps {
  icon: string
  accent: string 
  loading?: boolean
  IconKind: any
  onPress()
}

export default function Button({ IconKind, icon, loading, accent = "#fff", onPress } : IButtonProps) {
  const { color, trackColor } = useAccentColor(accent)
  
  return (
    <ButtonContainer disabled={loading} onPress={onPress} underlayColor={trackColor}>
      {loading ? <ActivityIndicator size={24} color={color} /> : <IconKind name={icon} color={color} size={24} />}
    </ButtonContainer>
  )
}