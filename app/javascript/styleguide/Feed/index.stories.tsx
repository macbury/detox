import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Feed, { IFeedProps } from './index'

export default {
  title: 'Feed/List',
  component: Feed
} as Meta<IFeedProps>;

const Template: Story<IFeedProps> = (args) => {
  return <Feed {...args} />
};

export const EmptyFeed = Template.bind({});

EmptyFeed.args = {
  stories: []
}

export const FeedWithLoading = Template.bind({});

FeedWithLoading.args = {
  stories: [],
  isLoading: true
}

export const FeedWithStories = Template.bind({});

const ArticleStory = {
  channel: {
    name: 'Channel name'
  },
  title: 'Article title',
  domain: 'duckduckgo.com',
  summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
  attachment: {
    __typename: 'Article',
    poster: {
      width: 400,
      height: 300,
      url: 'https://blurha.sh/assets/images/img1.jpg',
      blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
    }
  }
}

FeedWithStories.args = {
  stories: [ArticleStory],
  getLinkForStory: () => ({ routeName: 'ShowArticle', web: { path: '/articles/test' } })
}