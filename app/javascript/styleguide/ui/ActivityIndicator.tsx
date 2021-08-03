import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { useTheme } from 'styled-components/native'

export interface IActivityIndicatorProps extends ActivityIndicatorProps {}

export default function MyActivityIndicator(props : IActivityIndicatorProps) {
  const { colors } = useTheme()
  return <ActivityIndicator {...props} color={colors.primary} />
}
