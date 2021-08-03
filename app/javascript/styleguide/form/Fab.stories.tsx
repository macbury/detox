import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Fab, { IFabProps } from './Fab'

export default {
  title: 'Form/Fab',
  component: Fab
} as Meta<IFabProps>;

const Template: Story<IFabProps> = (args) => {
  return <Fab {...args} />
};

export const Plus = Template.bind({});

Plus.args = {
  icon: 'plus'
};

export const Loading = Template.bind({});

Loading.args = {
  icon: 'plus',
  loading: true
};