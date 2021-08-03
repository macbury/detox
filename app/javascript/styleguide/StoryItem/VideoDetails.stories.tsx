import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import VideoDetails, { IVideoDetailsProps } from './VideoDetails'
import styled from 'styled-components/native';

const Container = styled.View`
  width: 400px;
`

export default {
  title: 'Story Item/Video Details',
  component: VideoDetails
} as Meta<IVideoDetailsProps>;

const Template: Story<IVideoDetailsProps> = (args) => {
  return (
    <Container>
      <VideoDetails {...args} />
    </Container>
  )
};

export const Example = Template.bind({});

Example.args = {
  videoPath: 'https://brave.com/',
  width: 400,
  story: {
    title: 'New video',
    attachment: {
      __typename: 'Video',
      duration: 10 * 1000,
      poster: {
        width: 454,
        height: 225,
        url: 'https://blurha.sh/assets/images/img1.jpg',
        blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
      }
    }
  }
}