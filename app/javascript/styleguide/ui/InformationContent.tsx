import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { Header4 } from '../form/Text'

export interface IInformationContentProps {
  /**
   * Message or i18n key to fetch it from translations
   */
  message: string
  icon: string
  style?: any
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  opacity: 0.3;
  min-height: 300px;
`

const Description = styled(Header4)`
  text-align: center;
  margin-top: 10px;
`

/**
 * Display centered error message with random table flip emoji
 */
export default function InformationContent({ message, icon } : IInformationContentProps) {
  const { t } = useTranslation()
  const { colors: { text } } = useTheme()

  return (
    <Container>
      <MaterialCommunityIcon
        color={text}
        name={icon}
        size={70} />
      <Description>{t(message)}</Description>
    </Container>
  )
}