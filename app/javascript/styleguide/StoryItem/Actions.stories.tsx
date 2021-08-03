import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Actions, { IActionProps } from './Actions'

export default {
  title: 'Story Item/Actions',
  component: Actions
} as Meta<IActionProps>;

const Template: Story<IActionProps> = (args) => {
  return <Actions {...args} />
};

export const Unread = Template.bind({});

export const Read = Template.bind({});
Read.args = {
  story: { isRead: true }
}