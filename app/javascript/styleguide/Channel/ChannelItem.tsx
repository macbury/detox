import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { ChannelKind } from '@detox/api'
import { Channel } from '@detox/store/models/Channel'
import { TUrlProps } from '@detox/shared'
import Link from '../Link'
import Card from '../Card'
import Header, {
  HeaderIcon,
  HeaderContent,
  HeaderTitle,
  HeaderSubTitle,
} from '../Card/Header'

const KindIcon = styled(MaterialIcon)`
  margin-left: 5px;
  margin-right: 5px;
`

export interface IChannelItemProps {
  channel: Channel
  channelPath: TUrlProps
}

const ChannelCard = styled(Card)`
  flex: 1;
  display: flex;
  min-height: 82px;
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  margin-right: ${({ theme }) => theme.device === 'desktop' ? '10px' : '0px'};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '50px' : '0px'};
`

const ErrorSubTitle = styled(HeaderSubTitle)`
  color: ${({ theme }) => theme.colors.error};
`

const ChannelLink = styled(Link)`
  flex: 1;
`

const ChannelLinkInner = styled.View`
  flex: 1;
  width: 100%;
`

function channelKindToIconName(kind : ChannelKind) {
  switch(kind) {
    case ChannelKind.Rss:
      return 'rss'
    case ChannelKind.Youtube:
      return 'youtube'
    case ChannelKind.Twitter:
      return 'twitter'
    default:
      return 'alert-octagon-outline' 
  }
}

export default function ChannelItem({ channel, channelPath } : IChannelItemProps) {
  const theme = useTheme()

  return (
    <ChannelLink to={channelPath}>
      <ChannelCard shadow={2}>
        <Header>
          <HeaderIcon large channel={channel} unread={false} />
          <HeaderContent>
            <HeaderTitle numberOfLines={1}>{channel.name}</HeaderTitle>
            {
              channel.error ?
                <ErrorSubTitle numberOfLines={1}>{channel.error}</ErrorSubTitle> : <HeaderSubTitle numberOfLines={1}>{channel.domain}</HeaderSubTitle>
            }
          </HeaderContent>
          <KindIcon
            color={theme.colors.cardHeaderSubTitle}
            name={channelKindToIconName(channel?.kind)}
            size={32} />
        </Header>
      </ChannelCard>
    </ChannelLink>
  )
}