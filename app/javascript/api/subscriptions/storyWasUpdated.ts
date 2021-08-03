import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Subscription, Variant } from '../graphql'
import StoryFeedItemView from '../fragments/StoryFeedItemView'

export const STORY_WAS_UPDATED_SUBSCRIPTION = gql`
  ${StoryFeedItemView}

  subscription($variant: Variant) {
    observeStories {
      unreadStories {
        total
        
        groups {
          id
          unread
        }
      }

      new {
        ...StoryFeedItemView
      }
      
      updated {
        id
        isRead
        isFavorite
      }
    }
  }
`

export async function watchUpdatedStories(client : ApolloClient<any>) {
  return await client.subscribe<Subscription>({
    query: STORY_WAS_UPDATED_SUBSCRIPTION,
    variables: {
      variant: Variant.Desktop
    }
  })
}
