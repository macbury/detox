import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import CollapseDrawerButton, { ICollapseDrawerButtonProps } from './CollapseDrawerButton'

export default {
  title: 'Drawer/CollapseDrawerButton',
  component: CollapseDrawerButton
} as Meta<ICollapseDrawerButtonProps>;

const Template: Story<ICollapseDrawerButtonProps> = (args) => {
  return <CollapseDrawerButton {...args} />
};

export const Collapsed = Template.bind({});

Collapsed.args = {
  collapsed: true,
  title: 'detox'
}

export const Expanded = Template.bind({});

Expanded.args = {
  collapsed: false,
  title: 'detox'
}