import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Menu, { IMenuProps } from './index'
import MenuButton from './MenuButton'
import MenuSplit from './MenuSplit'

export default {
  title: 'Menu/Menu',
  component: Menu
} as Meta<IMenuProps>;

const Template: Story = (args : any) => {
  return (
    <Menu {...args}>
      <MenuButton onPress={() => null}>Item 1</MenuButton>
      <MenuButton onPress={() => null}>Item 2</MenuButton>
      <MenuSplit />
      <MenuButton onPress={() => null}>Item 3</MenuButton>
    </Menu>
  )
};

export const Example = Template.bind({});

Example.args = {
  visible: true
};
