import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { UpdatePlaybackInput, Mutation, MutationUpdatePlaybackArgs, Story } from '../graphql'

export type { UpdatePlaybackInput }

export const UPDATE_PLAYBACK_STATE_MUTATION = gql`
  mutation updatePlayback($input: UpdatePlaybackInput!) {
    updatePlayback(input: $input) {
      story {
        id
        isRead
      }
      errors
    }
  }
`

export type UpdatePlaybackResult = {
  success: boolean
  errors: string[]
  story: Story
}

export async function updatePlaybackMutation(client : ApolloClient<any>, input : UpdatePlaybackInput) : Promise<UpdatePlaybackResult> {
  try {
    const { data: { updatePlayback } } = await client.mutate<Mutation, MutationUpdatePlaybackArgs>({
      mutation: UPDATE_PLAYBACK_STATE_MUTATION,
      variables: { input }
    })

    return {
      success: !updatePlayback.errors,
      errors: updatePlayback.errors || [],
      story: updatePlayback.story
    }
  } catch (e) {
    return {
      success: false,
      errors: [e],
      story: null
    }
  }
}
