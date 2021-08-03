import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import PlayPauseButton, { IPlayPauseButtonProps } from './PlayPauseButton'

export default {
  title: 'Media Controls/Play pause',
  component: PlayPauseButton
} as Meta<IPlayPauseButtonProps>;

const Template: Story<IPlayPauseButtonProps> = (args) => {
  return <PlayPauseButton {...args} />
};

export const Example = Template.bind({})

Example.args = {
  playAsync: () => null,
  pauseAsync: () => null,
  accent: 'rgb(51, 153, 102)'
}