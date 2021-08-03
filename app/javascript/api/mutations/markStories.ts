import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { MarkStoriesInput, MutationMarkStoriesArgs, Mutation } from '../graphql'

export const MARK_STORIES_MUTATION = gql`
  mutation markStories($input: MarkStoriesInput!) {
    markStories(input: $input) {
      errors
    }
  }
`

export default async function markStoriesMutation(client : ApolloClient<any>, input : MarkStoriesInput) : Promise<boolean> {
  try {
    const { data: { markStories } } = await client.mutate<Mutation, MutationMarkStoriesArgs>({
      mutation: MARK_STORIES_MUTATION,
      variables: { input }
    })

    return markStories.errors.length === 0

    return true
  } catch (e) {
    return false
  }
}
