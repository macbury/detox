import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Logout, { ILogoutProps } from './Logout'

export default {
  title: 'Drawer/Logout',
  component: Logout
} as Meta<ILogoutProps>;

const Template: Story<ILogoutProps> = (args) => {
  return <Logout {...args} />
};

export const Example = Template.bind({});

Example.args = {} as ILogoutProps
