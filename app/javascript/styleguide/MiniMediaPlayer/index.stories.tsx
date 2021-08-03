import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import MiniMediaPlayer, { IMiniMediaPlayerProps } from '.'

export default {
  title: 'Mini Media Player',
  component: MiniMediaPlayer
} as Meta<IMiniMediaPlayerProps>;

const Template: Story<IMiniMediaPlayerProps> = (args) => {
  return (
    <MiniMediaPlayer {...args} />
  )
};

export const Example = Template.bind({});

Example.args = {
  compact: false,
  media: {
    __typename: 'Audio',
    id: 'abcd',
    duration: 10 * 1000,
    poster: {
      width: 454,
      height: 225,
      url: 'https://www.freetalklive.com/files/itunes1400.jpg',
      blurhash: 'LMJR1ot2jDaK9kRkR:Rn}|oMxtxr',
      colors: {
        background: "#f8dd09",
        foreground: "#0d0d0f",
        accent: "#060d61"
      }
    }
  }
} as IMiniMediaPlayerProps
