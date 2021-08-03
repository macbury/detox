import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import AccountContainer, { IAccountContainerProps } from './AccountContainer'

export default {
  title: 'Drawer/AccountContainer',
  component: AccountContainer
} as Meta<IAccountContainerProps>;

const Template: Story<IAccountContainerProps> = (args) => {
  return <AccountContainer {...args} />
};

export const Example = Template.bind({});

Example.args = {
  username: 'edzio',
  backendUrl: 'https://localhost:3000/api'
} as IAccountContainerProps