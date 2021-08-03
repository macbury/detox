import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ChannelIcon, { IChannelProps } from './ChannelIcon'

export default {
  title: 'Channel/ChannelIcon',
  component: ChannelIcon
} as Meta<IChannelProps>;

const Template: Story<IChannelProps> = (args) => {
  return <ChannelIcon {...args} />
};

export const LargeWithoutChannel = Template.bind({});

LargeWithoutChannel.args = {
  unread: true,
  large: true
};

export const SmallWithChannel = Template.bind({});

SmallWithChannel.args = {
  unread: true,
  large: false,
  channel: {
    iconUrl: 'https://odysee.com/public/favicon.png'
  }
};
