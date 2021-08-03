import { ApolloClient } from 'apollo-client'
import { Query, Setting } from '../graphql'
import gql from 'graphql-tag'

export type { Setting }

export const GET_SETTINGS = gql`
  query settings {
    settings {
      key
      value
      valueType
      secret
    }
  }
`

export default async function getSettings(client : ApolloClient<any>) : Promise<Setting[]> {
  try {
    const { data: { settings } } = await client.query<Query>({
      query: GET_SETTINGS,
    })

    return settings
  } catch (e) {
    return []
  }
}