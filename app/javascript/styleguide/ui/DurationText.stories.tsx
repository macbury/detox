import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import DurationText, { IDurationTextProps } from './DurationText'

export default {
  title: 'UI/DurationText',
  component: DurationText
} as Meta<IDurationTextProps>;

const Template: Story<IDurationTextProps> = (args) => {
  return <DurationText {...args} />
};

export const Example = Template.bind({})

Example.args = {
  children: 12 * 1000
}