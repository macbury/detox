import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import FeedLoadingFooter, { IFeedLoadingFooterProps } from './FeedLoadingFooter'

export default {
  title: 'UI/FeedLoadingFooter',
  component: FeedLoadingFooter
} as Meta<IFeedLoadingFooterProps>;

const Template: Story<IFeedLoadingFooterProps> = (args) => {
  return <FeedLoadingFooter {...args} />
};

export const Example = Template.bind({})

Example.args = {
  visible: true
}