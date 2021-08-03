import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { UpdateChannelInput, Mutation, MutationUpdateChannelArgs, ChannelStatus } from '../graphql'

export type { UpdateChannelInput }
export { ChannelStatus }

export const UPDATE_CHANNEL_MUTATION = gql`
  mutation updateChannel($input: UpdateChannelInput!) {
    updateChannel(input: $input) {
      channel {
        id
      }
      errors
    }
  }
`

export type TUpdateResult = {
  success: boolean;
  errors: string[]
}

export default async function updateChannelMutation(client : ApolloClient<any>, input : UpdateChannelInput) : Promise<TUpdateResult> {
  try {
    const { data: { updateChannel } } = await client.mutate<Mutation, MutationUpdateChannelArgs>({
      mutation: UPDATE_CHANNEL_MUTATION,
      variables: { input }
    })

    return {
      success: !updateChannel.errors,
      errors: updateChannel.errors || []
    }
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}
