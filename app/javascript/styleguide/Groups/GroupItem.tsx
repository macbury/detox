import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { Group } from '@detox/store/models/Group'
import { TUrlProps } from '@detox/shared'
import Link from '../Link'
import Card from '../Card'
import Header, {
  HeaderContent,
  HeaderTitle
} from '../Card/Header'

const GroupIcon = styled(MaterialIcon)`
  margin-left: 10px;
  margin-right: 10px;
`

export interface IGroupItemProps {
  group: Group
  groupPath: TUrlProps
}

const GroupCard = styled(Card)`
  flex: 1;
  display: flex;
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  margin-right: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '50px' : '0px'};
`

export const MOBILE_GROUP_HEIGHT = 90

const GroupLink = styled(Link)`
  flex:1;
  margin-bottom: ${({ theme }) => theme.device === 'desktop' ? '20px' : '0px'};
`

export default function ChannelItem({ group, groupPath } : IGroupItemProps) {
  const theme = useTheme()

  return (
    <GroupLink to={groupPath}>
      <GroupCard shadow={2}>
        <Header>
          <GroupIcon
            color={theme.colors.cardHeaderSubTitle}
            name={group.icon}
            size={32} />
          <HeaderContent>
            <HeaderTitle numberOfLines={1}>{group.name}</HeaderTitle>
          </HeaderContent>
        </Header>
      </GroupCard>
    </GroupLink>
  )
}