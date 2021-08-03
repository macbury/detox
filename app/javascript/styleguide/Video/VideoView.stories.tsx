import React from 'react'
import { MediaVideo } from '@detox/store/AV'
import { Story, Meta } from '@storybook/react/types-6-0'
import VideoView, { IVideoViewProps } from './VideoView'

export default {
  title: 'Player/VideoView',
  component: VideoView
} as Meta<IVideoViewProps>;

const Template: Story<IVideoViewProps> = ({ width }) => {
  const media = new MediaVideo(null, 'abcd')
  media.put({
    duration: 1000,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    poster: {
      id: 'sss',
      width: 320,
      height: 240,
      url: 'https://blurha.sh/assets/images/img1.jpg',
      blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'
    }
  })
  
  setTimeout(() => {
    console.log('Loading...')
    media.load()
  }, 1000)

  return (
    <VideoView width={width} media={media} />
  )
};

export const Example = Template.bind({})

Example.args = {
  width: 320,
} as IVideoViewProps