import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { Query, Story, Video, Article, QueryGetStoryArgs, Variant } from '../graphql'
import StoryFeedItemView from '../fragments/StoryFeedItemView'

export type { Story, Article, Video }

export const GET_STORY_QUERY = gql`
  ${StoryFeedItemView}
  query getStory($id: ID!, $variant: Variant) {
    getStory(id: $id) {
      ...StoryFeedItemView
    }
  }
`

export default async function getStoryQuery(client : ApolloClient<any>, storyId: string) : Promise<Story> {
  const { data: { getStory } } = await client.query<Query>({
    query: GET_STORY_QUERY,
    variables: { id: storyId, variant: Variant.Desktop }
  })

  return getStory
}