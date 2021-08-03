import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components/native'
import StoryItem, { IStoryItemProps } from './index'
import FeedItemsRepository from '@detox/store/repositories/FeedItemsRepository'
import ChannelsRepository from '@detox/store/repositories/ChannelsRepository'
import { NonPersistableStore } from '@detox/store/core/SubStore'
import { AVManager } from '@detox/store/AV'

class TestStore extends NonPersistableStore {
  public channels : ChannelsRepository
  public stories : FeedItemsRepository

  constructor() {
    super(null)

    this.channels = this.registerRepository(new ChannelsRepository(this)) as any
    this.stories = this.registerRepository(new FeedItemsRepository(this)) as any
    this.registerRepository(new AVManager(this))
  }
}

const Container = styled.View`
  margin: 120px auto;
`

export default {
  title: 'Story Item/Story',
  component: StoryItem,
} as Meta<IStoryItemProps>;

const Template: Story<IStoryItemProps> = (args) => {
  const store = new TestStore()
  store.channels.create({
    id: 'test-channel',
    name: 'Channel name'
  })

  const story = store.stories.create(args.story)

  return (
    <Container style={{ width: args.width }}>
      <StoryItem {...args} story={story} />
    </Container>
  )
};

export const Article = Template.bind({});

Article.args = {
  to: {
    routeName: 'test',
    web: { as: '/' }
  },
  width: 560,
  story: {
    channel: {
      id: 'test-channel',
    },
    title: 'Article title',
    domain: 'duckduckgo.com',
    summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
    attachment: {
      __typename: 'Article',
      poster: {
        width: 400,
        height: 300,
        url: 'https://blurha.sh/assets/images/img1.jpg',
        blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
      }
    }
  }
}

export const Video = Template.bind({});

Video.args = {
  to: {
    routeName: 'test',
    web: { as: '/' }
  },
  width: 560,
  story: {
    channel: {
      id: 'test-channel',
    },
    title: 'Video title',
    domain: 'duckduckgo.com',
    summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
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

export const Audio = Template.bind({});

Audio.args = {
  to: {
    routeName: 'test',
    web: { as: '/' }
  },
  width: 560,
  story: {
    channel: {
      id: 'test-channel',
    },
    title: 'Video title',
    domain: 'duckduckgo.com',
    summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
    attachment: {
      __typename: 'Audio',
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
  }
}