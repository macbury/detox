import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, text } from '@storybook/addon-knobs';
import DiscoveredChannelItem,   { IDiscoveredChannelProps } from './DiscoveredChannelItem'

export default {
  title: 'Channel/DiscoveredChannelItem',
  component: DiscoveredChannelItem,
  decorators: [withKnobs],
} as Meta<IDiscoveredChannelProps>;

const Template: Story<IDiscoveredChannelProps> = (args) => {
  const discoveredChannel = {
    iconUrl: text('Channel icon url', 'https://odysee.com/public/favicon.png'),
    title: text('Channel title', 'Example channel'),
    source: text('Channel source', 'https://feed.at/feed.rss')
  }

  const props : any = { ...args, channel: discoveredChannel }

  return <DiscoveredChannelItem {...props} />
};

export const Example = Template.bind({});
