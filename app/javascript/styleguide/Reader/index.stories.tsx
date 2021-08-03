import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Reader, { IReaderProps } from './index'

export default {
  title: 'Reader',
  component: Reader
} as Meta<IReaderProps>;


export const Article: Story<IReaderProps> = (args) => {
  return <Reader {...args} />
};

Article.args = {
  channelName: 'reason.com',
  content: require('./articles/fix_internet.html'),
  publishedAt: '2021-02-06T14:47:28.491Z',
  title: 'How To Fix the Internet',
  url: 'https://reason.com/2021/02/05/americans-shouldnt-be-treated-like-isis-insurgents/'
}