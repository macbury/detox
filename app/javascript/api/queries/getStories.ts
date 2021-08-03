import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { Query, QueryStoriesArgs, StoryConnection, Story, PageInfo, Order, StoryKind, Variant } from '../graphql'
import StoryFeedItemView from '../fragments/StoryFeedItemView'

export type { StoryConnection, Story, PageInfo, Order }
export { StoryKind, Variant }

export const GET_STORIES_QUERY = gql`
  ${StoryFeedItemView}

  query getStories($groupId: ID, $channelId: ID, $kind: StoryKind, $unread: Boolean, $favorite: Boolean, $order: Order, $first: Int, $after: String, $exceptIds: [ID!], $startTime: TimeArgument, $variant: Variant) {
    stories(groupId: $groupId, channelId: $channelId, favorite: $favorite, unread: $unread, order: $order, first: $first, after: $after, exceptIds: $exceptIds, startTime: $startTime, kind: $kind) {
      nodes {
        ...StoryFeedItemView
      }

      pageInfo {
        hasNextPage
        endCursor
      }

      totalCount
    }
  }
`

export const GET_STORIES_IDS_QUERY = gql`
  query getStories($groupId: ID, $channelId: ID, $kind: StoryKind, $favorite: Boolean, $unread: Boolean, $order: Order, $first: Int, $after: String, $exceptIds: [ID!], $startTime: TimeArgument) {
    stories(groupId: $groupId, channelId: $channelId, favorite: $favorite, unread: $unread, order: $order, first: $first, after: $after, exceptIds: $exceptIds, startTime: $startTime, kind: $kind) {
      nodes {
        id
      }
    }
  }
`

export const GET_STORIES_COUNT_QUERY = gql`
  query getStoriesCount($groupId: ID, $channelId: ID, $unread: Boolean, $favorite: Boolean, $startTime: TimeArgument) {
    stories(groupId: $groupId, channelId: $channelId, unread: $unread, favorite: $favorite, startTime: $startTime) {
      totalCount
    }
  }
`

export type TStoriesFilters = {
  after?: string,
  order?: Order
  exceptIds?: string[]
  first: number,
  startTime: string,
  kind?: StoryKind,
  channelId?: string
  groupId?: string
  variant: Variant
}

export async function getStoriesQuery(client : ApolloClient<any>, filters? : TStoriesFilters) : Promise<StoryConnection> {
  const { data: { stories } } = await client.query<Query, QueryStoriesArgs>({
    query: GET_STORIES_QUERY,
    variables: filters
  })

  return stories
}

interface IUnreadFilterOptions {
  channelId?: string
  groupId?: string
}

export async function getUnreadStoriesCountQuery(client : ApolloClient<any>, options : IUnreadFilterOptions = {}) : Promise<number> {
  const { data: { stories } } = await client.query<Query, QueryStoriesArgs>({
    query: GET_STORIES_COUNT_QUERY,
    variables: {
      unread: true,
      startTime: new Date(),
      ...options
    }
  })

  return stories?.totalCount || 0
}

export type TStoryIds = string[]

export async function getStoriesIdsQuery(client : ApolloClient<any>, filters? : TStoriesFilters) : Promise<TStoryIds> {
  const { data: { stories } } = await client.query<Query, QueryStoriesArgs>({
    query: GET_STORIES_IDS_QUERY,
    variables: {
      ...filters,
      first: 1000
    }
  })

  return stories.nodes.map(({ id }) => id)
}