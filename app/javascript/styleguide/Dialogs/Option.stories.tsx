import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Option, { IOptionProps } from './Option'

export default {
  title: 'Dialogs/Option',
  component: Option
} as Meta<IOptionProps>;

const Template: Story<IOptionProps> = (args) => {
  return (
    <Option {...args} />
  )
};

export const Example = Template.bind({});

Example.args = {
  selected: false,
  label: 'boom'
}