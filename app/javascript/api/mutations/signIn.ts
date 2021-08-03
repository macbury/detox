import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { SignInInput, Mutation, MutationSignInArgs } from '../graphql'

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      session {
        id
      }
      errors
    }
  }
`

export type SignInResult = {
  errors: string[]
  sessionId?: string
}

/**
 * Sign in to current service with username and password
 * @param client
 * @param options
 */
export default async function signInMutation(client : ApolloClient<any>, options : SignInInput) : Promise<SignInResult> {
  try {
    const { data: { signIn } } = await client.mutate<Mutation, MutationSignInArgs>({
      mutation: SIGN_IN_MUTATION,
      variables: { input: options }
    })

    return {
      errors: signIn?.errors,
      sessionId: signIn?.session?.id
    }
  } catch (e) {
    return {
      errors: [e]
    }
  }
}