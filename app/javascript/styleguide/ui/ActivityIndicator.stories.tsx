import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ActivityIndicator, { IActivityIndicatorProps } from './ActivityIndicator'

export default {
  title: 'UI/ActivityIndicator',
  component: ActivityIndicator
} as Meta<IActivityIndicatorProps>;

const Template: Story<IActivityIndicatorProps> = (args) => {
  return <ActivityIndicator {...args} />
};

export const Normal = Template.bind({})

Normal.args = {
  size: 64
}