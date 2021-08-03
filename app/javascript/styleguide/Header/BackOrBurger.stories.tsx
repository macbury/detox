import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import BackOrBurger from './BackOrBurger'

export default {
  title: 'Header/BackOrBurger',
  component: BackOrBurger
} as Meta<any>;

const Template: Story<any> = (args) => {
  return <BackOrBurger {...args} />
};

export const Example = Template.bind({});

Example.args = {
};
