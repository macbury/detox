import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ActionButton, { IActionButtonProps } from './ActionButton'

export default {
  title: 'Header/ActionButton',
  component: ActionButton
} as Meta<IActionButtonProps>;

const Template: Story<IActionButtonProps> = (args) => {
  return <ActionButton {...args} />
};

export const Example = Template.bind({});

Example.args = {
  icon: 'plus'
};
