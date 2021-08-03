import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ChannelItem, { IChannelItemProps } from './ChannelItem'

export default {
  title: 'Drawer/ChannelItem',
  component: ChannelItem
} as Meta<IChannelItemProps>;

const Template: Story<IChannelItemProps> = (args) => {
  return <ChannelItem {...args} />
};

export const SelectedItem = Template.bind({});

SelectedItem.args = {
  to: {
    routeName: 'test'
  },
  selected: true,
  channel: {
    iconUrl: 'https://odysee.com/public/favicon.png',
    name: "Channel name"
  }
} as IChannelItemProps