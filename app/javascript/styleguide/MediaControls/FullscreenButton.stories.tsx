import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import FullscreenButton, { IFullscreenButtonProps } from './FullscreenButton'

export default {
  title: 'Media Controls/Full Screen',
  component: FullscreenButton
} as Meta<IFullscreenButtonProps>;

const Template: Story<IFullscreenButtonProps> = (args) => {
  return <FullscreenButton {...args} />
};

export const Example = Template.bind({})

Example.args = {
  accent: 'rgb(51, 153, 102)'
}