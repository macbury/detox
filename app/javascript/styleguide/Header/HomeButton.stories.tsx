import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import HomeButton from './HomeButton'

export default {
  title: 'Header/HomeButton',
  component: HomeButton
} as Meta<any>;

const Template: Story<any> = (args) => {
  return <HomeButton {...args} />
};

export const Example = Template.bind({});

Example.args = {
};
