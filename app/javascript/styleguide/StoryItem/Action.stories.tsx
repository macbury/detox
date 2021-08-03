import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Action, { IActionProps } from './Action'

export default {
  title: 'Story Item/Action',
  component: Action
} as Meta<IActionProps>;

const Template: Story<IActionProps> = (args) => {
  return <Action {...args} />
};

export const Example = Template.bind({});

Example.args = {
  textKey: 'Action name',
  iconName: 'search',
  onPress: () => new Promise((resolve) => setTimeout(resolve, 1000))
}