import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import UserNavigationItems, { IUserNavigationProps } from './UserNavigationItems'

export default {
  title: 'Drawer/UserNavigationItems',
  component: UserNavigationItems
} as Meta<IUserNavigationProps>;

const Template: Story<IUserNavigationProps> = (args) => {
  return <UserNavigationItems {...args} />
};

export const Example = Template.bind({});

Example.args = {
  selectedRouteName: 'Stories',
  collapsed: false
} as IUserNavigationProps
