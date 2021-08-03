import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import LoadingContent from './LoadingContent'

export default {
  title: 'UI/LoadingContent',
  component: LoadingContent
} as Meta<any>;

const Template: Story<any> = (args) => {
  return <LoadingContent {...args} />
};

export const Example = Template.bind({})

Example.args = {
}