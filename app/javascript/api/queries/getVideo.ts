import { ApolloClient } from 'apollo-client'
import { Query, Story, Video, Stream, QueryGetStoryArgs } from '../graphql'
import gql from 'graphql-tag'
import StoryDetailsView from '../fragments/StoryDetailsView'
import PosterImageView from '../fragments/PosterImageView'

export type { Story, Video, Stream }

export const GET_VIDEO_QUERY = gql`
  ${StoryDetailsView}
  ${PosterImageView}

  query getStory($id: ID!) {
    getStory(id: $id) {
      ...StoryDetailsView

      attachment {
        ... on Video {
          id
          duration

          poster(variant: Desktop) {
            ...PosterImageView
          }
        }
      }
    }
  }
`

export const GET_VIDEO_STREAM_QUERY = gql`
  query getStory($id: ID!) {
    getStory(id: $id) {
      attachment {
        ... on Video {
          streams {
            url
            secureUrl
            quality
          }
        }
      }
    }
  }
`

export async function getVideoQuery(client : ApolloClient<any>, storyId: string) : Promise<Story> {
  const { data: { getStory } } = await client.query<Query, QueryGetStoryArgs>({
    query: GET_VIDEO_QUERY,
    variables: { id: storyId }
  })

  return getStory
}


export async function getVideoStreamQuery(client : ApolloClient<any>, storyId: string) : Promise<Stream[]> {
  const { data: { getStory } } = await client.query<Query, QueryGetStoryArgs>({
    query: GET_VIDEO_STREAM_QUERY,
    variables: { id: storyId }
  })

  return (getStory.attachment as Video).streams
}