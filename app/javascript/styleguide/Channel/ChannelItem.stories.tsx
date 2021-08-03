import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, text } from '@storybook/addon-knobs';
import { TUrlProps } from '@detox/shared'
import ChannelItem, { IChannelItemProps } from './ChannelItem'

export default {
  title: 'Channel/ChannelItem',
  component: ChannelItem,
  decorators: [withKnobs],
} as Meta<IChannelItemProps>;

const Template: Story<IChannelItemProps> = (args) => {
  const channelPath : TUrlProps = {
    routeName: 'ShowChannel'
  }

  const channel = {
    iconUrl: text('Channel icon url', 'https://odysee.com/public/favicon.png'),
    name: text('Channel name', 'Example channel'),
    domain: text('Channel domain', 'duckduckgo.com'),
    error: text('Channel error', '')
  }

  const props : any = { channelPath, channel }

  return <ChannelItem {...props} />
};

export const Example = Template.bind({});
