import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Actions, { IActionsProp } from './Actions'

export default {
  title: 'Feed/Actions',
  component: Actions
} as Meta<IActionsProp>;

const Template: Story<IActionsProp> = (args) => {
  return <Actions {...args} />
};

export const Example = Template.bind({});

Example.args = {
  loading: true
}