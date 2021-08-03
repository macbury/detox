import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import DrawerLink, { IDrawerLinkProps } from './DrawerLink'

export default {
  title: 'Drawer/DrawerLink',
  component: DrawerLink
} as Meta<IDrawerLinkProps>;

const Template: Story<IDrawerLinkProps> = (args) => {
  return <DrawerLink {...args} />
};

export const WithText = Template.bind({});

WithText.args = {
  to: { routeName: 'hello', web: { path: '/', as: '/' } },
  children: 'Hello world'
}

export const WithTextAndIcon = Template.bind({});

WithTextAndIcon.args = {
  to: { routeName: 'hello', web: { path: '/', as: '/' }  },
  children: 'Hello world',
  icon: 'menu'
}
