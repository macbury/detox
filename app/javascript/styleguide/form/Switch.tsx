import React from 'react'
import * as RN from 'react-native'
import { useTheme } from 'styled-components/native'

export interface ISwitchProps extends RN.SwitchProps {

}

export default function Switch(props : ISwitchProps) {
  const theme = useTheme()
  
  return (
    <RN.Switch
      thumbColor={theme.colors.primary}
      trackColor={{
        false: theme.colors.inputBackground,
        true: theme.colors.primary
      }}
      {...props} />
  )
}