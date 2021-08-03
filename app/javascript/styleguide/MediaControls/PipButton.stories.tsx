import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import PiPButton, { IPiPButtonProps } from './PiPButton'

export default {
  title: 'Media Controls/Pip',
  component: PiPButton
} as Meta<IPiPButtonProps>;

const Template: Story<IPiPButtonProps> = (args) => {
  return <PiPButton {...args} />
};

export const Example = Template.bind({})

Example.args = {
  accent: 'rgb(51, 153, 102)'
}