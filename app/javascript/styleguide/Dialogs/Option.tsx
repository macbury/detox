import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import Touchable from '../form/Touchable'
import Text from '../form/Text'


const Inner = styled.View`
  flex-direction: row;
  align-items: center;
  height: 48px;
  padding: 0 25px;
`

const Icon = styled(MaterialIcon)`
  margin-right: 10px;
`

export interface IOptionProps {
  label: string
  selected?: boolean
  onPress(selected: boolean)
}

export default function Option({ label, selected, onPress, ...props } : IOptionProps) {
  const theme = useTheme()
  return (
    <Touchable onPress={() => onPress(!selected)} {...onPress}>
      <Inner>
        <Icon
          size={24}
          name={selected ? 'radiobox-marked' : "radiobox-blank"}
          color={theme.colors.text} />
        <Text>{label}</Text>
      </Inner>
    </Touchable>
  )
}