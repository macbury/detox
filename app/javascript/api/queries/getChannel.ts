import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Query, Channel } from '../graphql'

export type { Channel }

export type TChannelResult = {
  channel?: Channel,
  errors: string[]
}

export const GET_CHANNEL_QUERY = gql`
  query getChannel($id: ID!) {
    getChannel(id: $id) {
      id
      name
      kind
      siteUrl
      source
      userAgent
      iconUrl
      domain
      downloadPage
      extractionRules
      rejectRules
      blockRules
      rewriteRules
    }
  }
`

export async function getChannel(client : ApolloClient<any>, channelId : string) : Promise<TChannelResult> {
  try {
    const { data: { getChannel } } = await client.query<Query>({
      query: GET_CHANNEL_QUERY,
      variables: { id: channelId }
    })

    return {
      channel: getChannel,
      errors: []
    }
  } catch (e) {
    return {
      errors: [e]
    }
  }
}