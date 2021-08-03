import { ApolloClient } from 'apollo-client'
import { Query, Story, QueryGetStoryArgs } from '../graphql'
import gql from 'graphql-tag'
import StoryDetailsView from '../fragments/StoryDetailsView'
import PosterImageView from '../fragments/PosterImageView'

export type { Story }

export const GET_FULL_ARTICLE_QUERY = gql`
  ${StoryDetailsView}
  ${PosterImageView}

  query getStory($id: ID!) {
    getStory(id: $id) {
      ...StoryDetailsView

      attachment {
        ... on Article {
          id
          body
          commentsUrl

          poster(variant: Desktop) {
            ...PosterImageView
          }
        }
      }
    }
  }
`

export const GET_BASIC_ARTICLE_QUERY = gql`
  ${StoryDetailsView}

  query getStory($id: ID!) {
    getStory(id: $id) {
      ...StoryDetailsView
    }
  }
`

export default async function getArticleQuery(client : ApolloClient<any>, storyId: string, fullBody? : boolean) : Promise<Story> {
  const { data: { getStory } } = await client.query<Query, QueryGetStoryArgs>({
    query: fullBody ? GET_FULL_ARTICLE_QUERY : GET_BASIC_ARTICLE_QUERY,
    variables: { id: storyId }
  })

  return getStory
}