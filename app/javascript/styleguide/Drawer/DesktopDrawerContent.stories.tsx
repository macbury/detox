import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import DesktopDrawerContent, { IDesktopDrawerContentProps } from './DesktopDrawerContent'
import ChannelItem from './ChannelItem';

const Wrapper = styled.View`
  min-height: 850px;
  flex: 1;
`

export default {
  title: 'Drawer/DesktopDrawerContent',
  component: DesktopDrawerContent
} as Meta<IDesktopDrawerContentProps>;

const Template: Story<IDesktopDrawerContentProps> = (args) => {
  const channels : any = (new Array(10)).fill(null).map((v, index) => {
    const channel : any = {
      iconUrl: 'https://odysee.com/public/favicon.png',
      name: `Channel ${index}`
    }

    return <ChannelItem key={index} to={{ routeName: 'Channel', web: { as: '#', path: '#' } }} channel={channel} />
  })

  return (
    <Wrapper>
      <DesktopDrawerContent {...args}>
        {channels}
      </DesktopDrawerContent>
    </Wrapper>
  )
};

export const Example = Template.bind({});

Example.args = {
  state: {
    index: 1,
    routeNames: ['Stories', 'ListChannels']
  }
} as IDesktopDrawerContentProps

export const Collapsed = Template.bind({});
Collapsed.args = {
  collapsed: true,
  unreadStoriesCount: "10",
  state: {
    index: 1,
    routeNames: ['Stories', 'Unread']
  }
} as IDesktopDrawerContentProps
