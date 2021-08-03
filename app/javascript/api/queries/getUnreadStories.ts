import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { Query, UnreadStories } from '../graphql'

export type { UnreadStories }

export const GET_UNREAD_STORIES_QUERY = gql`
  query unreadStories {
    unreadStories {
      total

      groups {
        id
        unread
      }
    }
  }
`

export async function getUnreadStories(client : ApolloClient<any>) : Promise<UnreadStories> {
  const { data: { unreadStories } } = await client.query<Query>({
    query: GET_UNREAD_STORIES_QUERY
  })

  return unreadStories
}