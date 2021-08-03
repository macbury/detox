import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuLink from './MenuLink'

export default {
  title: 'Menu/Link',
  component: MenuLink
} as Meta;

const Template: Story = (args : any) => {
  return <MenuLink {...args} />
};

export const Example = Template.bind({});

Example.args = {
  children: 'Hello world'
};
