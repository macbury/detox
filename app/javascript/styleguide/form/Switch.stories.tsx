import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Switch, { ISwitchProps } from './Switch'

export default {
  title: 'Form/Switch',
  component: Switch
} as Meta<ISwitchProps>;

const Template: Story<ISwitchProps> = (args) => {
  const [on, setOn] = useState(false)
  return <Switch {...args} onValueChange={setOn} value={on} />
};

export const Basic = Template.bind({});

Basic.args = {
  
};