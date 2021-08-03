import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuButton, { IMenuButtonProps } from './MenuButton'

export default {
  title: 'Menu/Button',
  component: MenuButton
} as Meta<IMenuButtonProps>;

const Template: Story = (args : any) => {
  return <MenuButton {...args} />
};

export const Example = Template.bind({});

Example.args = {
  children: 'Hello world'
};
