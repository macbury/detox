import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import SwitchOption, { ISwitchOptionProps } from './SwitchOption'

export default {
  title: 'Form/SwitchOption',
  component: SwitchOption
} as Meta<ISwitchOptionProps>;

const Template: Story<ISwitchOptionProps> = (args) => {
  const [on, setOn] = useState(false)
  return <SwitchOption {...args} onValueChange={setOn} value={on} />
};

export const Basic = Template.bind({});

Basic.args = {
  label: "my new awesome switch"
};

export const SwitchWithIcon = Template.bind({});
SwitchWithIcon.args = {
  label: "switch with icon",
  icon: "bank"
};