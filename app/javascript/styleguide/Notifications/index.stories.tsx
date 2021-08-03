import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Notifications, { INotificationsProps } from './index'

export default {
  title: 'Notifications/Base',
  component: Notifications
} as Meta<INotificationsProps>;

const Template: Story<INotificationsProps> = (args) => {
  return <Notifications {...args} />
};

export const Example = Template.bind({});

Example.args = {
  notification: { message: 'Hello world' }
}