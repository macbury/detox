import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Query, Channel, ChannelStatus } from '../graphql'

export type { Channel }
export { ChannelStatus }

export type TChannelListResult = {
  channels?: Channel[],
  errors: string[]
}

export const GET_ALL_CHANNELS = gql`
  query getAllChannels {
    channels {
      nodes {
        id
        name
        kind
        iconUrl
        domain
        error
        status
        source
        rewriteRules
      }
    }
  }
`

export async function getChannels(client : ApolloClient<any>) : Promise<TChannelListResult> {
  try {
    const { data: { channels: getAllChannels } } = await client.query<Query>({
      query: GET_ALL_CHANNELS
    })

    return {
      channels: getAllChannels.nodes,
      errors: []
    }
  } catch (e) {
    return {
      errors: [e]
    }
  }
}