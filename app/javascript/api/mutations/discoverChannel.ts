import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Mutation, MutationDiscoverArgs, DiscoverPayload, DiscoveredChannel } from '../graphql'

export type { DiscoverPayload, DiscoveredChannel }

export const DISCOVERY_CHANNEL_MUTATION = gql`
  mutation discover($input: DiscoverInput!) {
    discover(input: $input) {
      channels {
        kind
        source
        title
        url
        iconUrl
      }

      errors
    }
  }
`

export default async function discoverChannel(client : ApolloClient<any>, url : string) : Promise<DiscoverPayload> {
  try {
    const { data: { discover } } = await client.mutate<Mutation, MutationDiscoverArgs>({
      mutation: DISCOVERY_CHANNEL_MUTATION,
      variables: { input: { url } }
    })

    return discover
  } catch (e) {
    return {
      errors: [e]
    }
  }
}