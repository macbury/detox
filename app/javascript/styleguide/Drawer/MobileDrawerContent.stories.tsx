import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import MobileDrawerContent, { IMobileDrawerContentProps } from './MobileDrawerContent'
import ChannelItem from './ChannelItem';

const Wrapper = styled.View`
  max-width: 320px;
  min-height: 850px;
  flex: 1;
  border-right-color: ${({ theme }) => theme.colors.border};
  border-right-width: 1px;
`

export default {
  title: 'Drawer/MobileDrawerContent',
  component: MobileDrawerContent
} as Meta<IMobileDrawerContentProps>;

const Template: Story<IMobileDrawerContentProps> = (args) => {
  const channels : any = (new Array(20)).fill(null).map((v, index) => {
    const channel : any = {
      iconUrl: 'https://odysee.com/public/favicon.png',
      name: `Channel ${index}`
    }

    return <ChannelItem key={index} to={{ routeName: 'Channel', web: { path: '/', as: '/' }  }} channel={channel} />
  })

  return (
    <Wrapper>
      <MobileDrawerContent {...args}>
        {channels}
      </MobileDrawerContent>
    </Wrapper>
  )
};

export const Example = Template.bind({});

Example.args = {
  username: 'Username',
  instanceUrl: 'https://instance.local',
  state: {
    index: 1,
    routeNames: ['Stories', 'ListChannels']
  }
} as IMobileDrawerContentProps
