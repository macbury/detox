import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuSplit from './MenuSplit'

export default {
  title: 'Menu/Split',
  component: MenuSplit
} as Meta;

const Template: Story = (args) => {
  return <MenuSplit {...args} />
};

export const Example = Template.bind({});

Example.args = {
};
