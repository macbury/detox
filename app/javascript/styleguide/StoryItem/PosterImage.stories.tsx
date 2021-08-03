import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import PosterImage from './PosterImage'
import { IPosterProps } from './PosterImage/shared'

export default {
  title: 'Story Item/Poster Image',
  component: PosterImage
} as Meta<IPosterProps>;

const Template: Story<IPosterProps> = (args) => {
  return <PosterImage {...args} />
};

export const Example = Template.bind({});

Example.args = {
  width: 454,
  poster: {
    width: 454,
    height: 225,
    url: 'https://blurha.sh/assets/images/img1.jpg',
    blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
  }
}