import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { SubscribeInput, Mutation, MutationSubscribeArgs, ChannelKind } from '../graphql'

export { ChannelKind }

export const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($input: SubscribeInput!) {
    subscribe(input: $input) {
      channel {
        id
      }

      errors
    }
  }
`

export type SubscribeResult = {
  errors?: string[]
  channelId?: string
}

/**
 * Subscribe to new channel
 * @param client
 * @param input
 */
export default async function subscribeMutation(client : ApolloClient<any>, input : SubscribeInput) : Promise<SubscribeResult> {
  try {
    const { data: { subscribe } } = await client.mutate<Mutation, MutationSubscribeArgs>({
      mutation: SUBSCRIBE_MUTATION,
      variables: { input }
    })

    return {
      errors: subscribe.errors,
      channelId: subscribe?.channel?.id
    }
  } catch (e) {
    return {
      errors: [e]
    }
  }
}