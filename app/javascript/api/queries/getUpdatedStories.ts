import dayjs from '@detox/shared/dayjs'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { Query, Story, QueryStoriesArgs } from '../graphql'

export type { Story }

export const GET_UPDATED_STORIES_QUERY = gql`
  fragment PlaybackStatus on Playback {
    id
    status
    position
    resumedAt
  }

  query updatesStories($updatedAfter: ISO8601DateTime) {
    stories(updatedAfter: $updatedAfter, first: 1000) {
      nodes {
        id
        
        isRead
        isFavorite
        
        attachment {
          ... on Audio {
            id
            playback {
              ...PlaybackStatus
            }
          }
          
          ... on Video {
            id
            playback {
              ...PlaybackStatus
            }
          }
        }
      }
    }
  }
`

export async function getUpdatedStories(client : ApolloClient<any>, updatedAfter: dayjs.Dayjs) : Promise<Story[]> {
  const { data: { stories } } = await client.query<Query, QueryStoriesArgs>({
    query: GET_UPDATED_STORIES_QUERY,
    variables: {
      updatedAfter: updatedAfter.toISOString()
    }
  })

  return stories.nodes
}