import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components/native'
import ArticleDetails, { IArticleDetails } from './ArticleDetails'

const Container = styled.View`
  width: 400px;
`

export default {
  title: 'Story Item/ArticleDetails',
  component: ArticleDetails,
} as Meta<IArticleDetails>;

const Template: Story<IArticleDetails> = (args) => {
  return (
    <Container>
      <ArticleDetails {...args} />
    </Container>
  )
};

export const ArticleWithPoster = Template.bind({});

ArticleWithPoster.args = {
  articlePath: {
    web: { path: '/duckduckgo.com' },
    routeName: 'ShowChannel',
  },
  width: 400,
  story: {
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

export const ArticleWithoutPoster = Template.bind({});

ArticleWithoutPoster.args = {
  articlePath: {
    web: { path: '/duckduckgo.com' },
    routeName: 'ShowChannel',
  },
  width: 400,
  story: {
    title: 'Article title',
    domain: 'duckduckgo.com',
    summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
    attachment: {
      __typename: 'Article'
    }
  }
}

export const OtherAttachment = Template.bind({});

OtherAttachment.args = {
  articlePath: 'https://duckduckgo.com',
  width: 400,
  story: {
    title: 'Article title',
    domain: 'duckduckgo.com',
    summary: 'Accusamus et culpa voluptates. Odio qui voluptatum qui adipisci minima. Sit suscipit cumque blanditiis sunt mollitia similique non. Vel voluptas velit expedita incidunt est temporibus. Rerum qui et alias voluptatem',
    attachment: {
      __typename: 'Video'
    }
  }
}