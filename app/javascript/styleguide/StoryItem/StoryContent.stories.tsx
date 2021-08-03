import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import StoryContent, { IStoryContentProps } from './StoryContent'

export default {
  title: 'Story Item/Story Content',
  component: StoryContent
} as Meta<IStoryContentProps>;

const Template: Story<IStoryContentProps> = (args) => {
  return <StoryContent {...args} />
};

export const Example = Template.bind({});

Example.args = {
  content: 'Qui natus ducimus sit dolor aperiam repellendus autem nihil. Quidem velit molestias vel cupiditate nisi. Blanditiis perferendis esse ut. Praesentium commodi alias eligendi aliquam totam.'
}