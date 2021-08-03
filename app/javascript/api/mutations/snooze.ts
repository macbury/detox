import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { SnoozeInput, Mutation, MutationSnoozeArgs } from '../graphql'

export type { SnoozeInput }

export const SNOOZE_MUTATION = gql`
  mutation snooze($input: SnoozeInput!) {
    snooze(input: $input) {
      story {
        id
      }
      errors
    }
  }
`

export type SnoozeResult = {
  success: boolean
  errors: string[]
}

export default async function snoozeMutation(client : ApolloClient<any>, input : SnoozeInput) : Promise<SnoozeResult> {
  try {
    const { data: { snooze } } = await client.mutate<Mutation, MutationSnoozeArgs>({
      mutation: SNOOZE_MUTATION,
      variables: { input }
    })

    return {
      success: !snooze.errors,
      errors: snooze.errors || []
    }
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}
