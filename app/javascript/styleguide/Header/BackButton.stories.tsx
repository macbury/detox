import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import BackButton from './BackButton'

export default {
  title: 'Header/BackButton',
  component: BackButton
} as Meta<any>;

const Template: Story<any> = (args) => {
  return <BackButton {...args} />
};

export const Example = Template.bind({});
