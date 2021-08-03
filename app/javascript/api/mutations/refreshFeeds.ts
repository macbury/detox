import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { RefreshAllPayload, Mutation } from '../graphql'

export type { RefreshAllPayload }

export const REFRESH_ALL_MUTATION = gql`
  mutation refreshAll {
    refreshAll {
      success
    }
  }
`

export default async function refreshAllMutation(client : ApolloClient<any>) : Promise<RefreshAllPayload> {
  try {
    const { data: { refreshAll } } = await client.mutate<Mutation>({
      mutation: REFRESH_ALL_MUTATION
    })

    return refreshAll
  } catch (e) {
    return {
      errors: [e],
      success: false
    }
  }
}