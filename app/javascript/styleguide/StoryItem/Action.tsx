import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Touchable from '../form/Touchable'
import ActivityIndicator from '../ui/ActivityIndicator'
import Text from '../form/Text'

const ActionTouchable = styled(Touchable)`
  padding: ${({ theme }) => theme.device === 'desktop' ? '16px' : '10px'};
  flex: 1;
  max-height: 46px;
`

const Loading = styled(ActivityIndicator)`
  
`

const Label = styled(Text)`
  margin-top: ${({ theme }) => theme.device === 'desktop' ? '0px' : '2px'};
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '8px' : '0px'};
  font-size: 14px;
`

const ActionInner = styled.View`
  flex-direction: ${({ theme }) => theme.device === 'desktop' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
`

export interface IActionProps {
  textKey: string;
  iconName: string;
  onPress() : Promise<any>
}

export default function Action({ textKey, iconName, onPress } : IActionProps) {
  const { device, colors } = useTheme()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const iconSize = device === 'desktop' ? 18 : 24

  const onPressCallback = useCallback(async () => {
    setLoading(true)
    await onPress()
    setLoading(false)
  }, [setLoading, onPress])

  const content = t(textKey)

  return (
    <ActionTouchable onPress={onPressCallback} disabled={loading} title={content}>
      <ActionInner>
        {loading ? <Loading size={iconSize} /> : <MaterialIcons
          color={colors.cardAction}
          name={iconName}
          size={iconSize} />}
        {device === 'desktop' && <Label>{content}</Label>}
      </ActionInner>
    </ActionTouchable>
  )
}