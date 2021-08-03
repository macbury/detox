import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { ReimportStoriesInput, Mutation, MutationReimportStoriesArgs } from '../graphql'


export const REIMPORT_MUTATION = gql`
  mutation reimportStories($input: ReimportStoriesInput!) {
    reimportStories(input: $input) {
      errors
    }
  }
`

export type TReimportResult = {
  success: boolean;
  errors: string[]
}

export default async function reimportStoriesMutation(client : ApolloClient<any>, id: string) : Promise<TReimportResult> {
  try {
    const { data: { reimportStories } } = await client.mutate<Mutation, MutationReimportStoriesArgs>({
      mutation: REIMPORT_MUTATION,
      variables: { input: { id } }
    })

    return {
      success: !reimportStories.errors,
      errors: reimportStories.errors || []
    }
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}
