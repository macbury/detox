import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import Switch, { ISwitchProps } from "./Switch"
import Text from './Text'

const Icon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
  margin-left: 5px;
`

const FormItem = styled.TouchableWithoutFeedback`
  
`

const FormItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding-left: 20px;
  margin-top: 0px;
  margin-bottom: 10px;
`

const FormCheckBox = styled(Switch)`
  margin-right: 10px;
`

interface ILabelProps {
  on?: boolean
  theme: DefaultTheme
}

const Label = styled(Text)`
  color: ${({ theme, on } : ILabelProps) => on ? theme.colors.primary : theme.colors.text};
`

export interface ISwitchOptionProps extends ISwitchProps {
  hidden?: boolean
  label: string
  icon?: string
}

export default function SwitchOption({ hidden, icon, label, value, onValueChange, ...props } : ISwitchOptionProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  if (hidden) {
    return null
  }

  return (
    <FormItemContainer>
      <FormCheckBox onValueChange={onValueChange} value={value} {...props} />
      {icon && <Icon color={value ? theme.colors.primary : theme.colors.text} name={icon} size={20} />}
      <FormItem onPress={() => onValueChange(!value) }>
        <Label on={value}>{t(label)}</Label>
      </FormItem>
    </FormItemContainer>
  )
}