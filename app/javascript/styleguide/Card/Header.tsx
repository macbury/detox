import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import Text from '../form/Text'
import Touchable from '../form/Touchable'
import Link from '../Link'
import ChannelIcon from '../Channel/ChannelIcon'

const Header = styled.View`
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: row;
`

export const HeaderIcon = styled(ChannelIcon)`
  margin-right: 16px;
`

export const HeaderTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.cardHeaderTitle};
  line-height: 20.0167px;
`

export const HeaderTitleLink = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.cardHeaderTitle};
  line-height: 20.0167px;
`

export const HeaderSubTitle = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.cardHeaderSubTitle};
  line-height: 20.0167px;
`

export const HeaderContent = styled.View`
  flex-direction: column;
  flex: 1;
`

export const HeaderActionContainer = styled(Touchable)`
  flex: 0 0 auto;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  margin-left: 10px;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  align-self: center;
`

export interface IHeaderActionProps {
  name: string;
  onPress();
}

export function HeaderAction({ name, onPress } : IHeaderActionProps) {
  const theme = useTheme()

  return (
    <HeaderActionContainer onPress={onPress}>
      <MaterialIcon
        name={name}
        size={24}
        color={theme.colors.cardAction} />
    </HeaderActionContainer>
  )
}

export default Header