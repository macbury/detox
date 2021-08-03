import React from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import Card from '../Card'
import Header, {
  HeaderContent,
  HeaderTitle,
  HeaderSubTitle,
} from '../Card/Header'
import Link from '../Link'
import { TUrlProps } from '@detox/shared'

export interface IOptionProps {
  title: string
  description: string
  value?: string
  icon: string
  to?: TUrlProps
  onPress?()
}

const IconLeft = styled(MaterialIcon)`
  margin-right: 15px;
  margin-left: 5px;
`

const IconRight = styled(MaterialIcon)`
  margin-left: 15px;
  margin-right: 5px;
`

const OptionCard = styled(Card)`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.device === 'desktop' ? '20px' : '10px'};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
`

const Value = styled(HeaderSubTitle)`
  font-size: 14px;
  flex: 0.3;
  text-align: right;
`

const TouchableLink = styled(Link)`
  display: flex;
  flex: 1;
`

const Description = styled(HeaderSubTitle)`
`

export default function Option({ onPress, icon, title, description, to, value } : IOptionProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <TouchableLink to={to} onPress={onPress}>
      <OptionCard shadow={2}>
        <Header>
          <IconLeft
            color={theme.colors.text}
            name={icon}
            size={32} />
          <HeaderContent>
            <HeaderTitle>{t(title)}</HeaderTitle>
            <Description>{t(description)}</Description>
          </HeaderContent>
          {value && <Value numberOfLines={2}>{value}</Value>}
          {to && <IconRight
            color={theme.colors.text}
            name="arrow-right"
            size={32} />}
        </Header>
      </OptionCard>
    </TouchableLink>
  )
}