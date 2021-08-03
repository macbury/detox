import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { UpdateStoryInput, Mutation, MutationUpdateStoryArgs, Story } from '../graphql'

export type { UpdateStoryInput }

export const UPDATE_STORY_MUTATION = gql`
  mutation updateStory($input: UpdateStoryInput!) {
    updateStory(input: $input) {
      story {
        id
        isRead
        isFavorite
      }
      errors
    }
  }
`

export type UpdateStoryResult = {
  success: boolean
  errors: string[]
  story: Story
}

export async function updateStoryMutation(client : ApolloClient<any>, input : UpdateStoryInput) : Promise<UpdateStoryResult> {
  try {
    const { data: { updateStory } } = await client.mutate<Mutation, MutationUpdateStoryArgs>({
      mutation: UPDATE_STORY_MUTATION,
      variables: { input }
    })

    return {
      story: updateStory.story,
      success: !updateStory.errors,
      errors: updateStory.errors || []
    }
  } catch (e) {
    return {
      story: null,
      success: false,
      errors: [e]
    }
  }
}
