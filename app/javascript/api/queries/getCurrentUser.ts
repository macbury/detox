import { ApolloClient } from 'apollo-client'
import { Query, CurrentUser, UserStatus } from '../graphql'
import gql from 'graphql-tag'

export type { CurrentUser }
export { UserStatus }

export type TCurrentUserResult = {
  currentUser?: CurrentUser
  errors: string[]
}

export const GET_CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      status
      username
    }
  }
`

export default async function getCurrentUserQuery(client : ApolloClient<any>) : Promise<TCurrentUserResult> {
  try {
    const { data: { currentUser } } = await client.query<Query>({
      query: GET_CURRENT_USER_QUERY,
    })

    return {
      currentUser,
      errors: []
    }
  } catch (e) {
    return {
      currentUser: null,
      errors: [e]
    }
  }
}