import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import DrawerButton, { IDrawerButtonProps } from './DrawerButton'

export default {
  title: 'Drawer/DrawerButton',
  component: DrawerButton
} as Meta<IDrawerButtonProps>;

const Template: Story<IDrawerButtonProps> = (args) => {
  return <DrawerButton {...args} />
};

export const WithText = Template.bind({});

WithText.args = {
  children: 'Hello world'
}

export const WithTextAndIcon = Template.bind({});

WithTextAndIcon.args = {
  children: 'Hello world',
  icon: 'menu'
}

export const OnlyIcon = Template.bind({});

OnlyIcon.args = {
  icon: 'menu'
}