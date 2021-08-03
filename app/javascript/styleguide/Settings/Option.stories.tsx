import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Option, { IOptionProps } from './Option'

export default {
  title: 'Settings/Option',
  component: Option
} as Meta<IOptionProps>;


export const Example: Story<IOptionProps> = (args) => {
  return <Option {...args} />
};

Example.args = {
  title: 'Option name',
  description: 'Description content',
  icon: 'cog',
  to: {
    routeName: 'Test',
    web: {
      path: 'www',
      as: 'www'
    }
  }
}