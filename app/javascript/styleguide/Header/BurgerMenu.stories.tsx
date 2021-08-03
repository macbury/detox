import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import BurgerMenu from './BurgerMenu'

export default {
  title: 'Header/BurgerMenu',
  component: BurgerMenu
} as Meta<any>;

const Template: Story<any> = (args) => {
  return <BurgerMenu {...args} />
};

export const Example = Template.bind({});

Example.args = {
};
