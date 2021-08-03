import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Query, Group } from '../graphql'
import GroupView from '../fragments/GroupView'

export const GET_GROUPS = gql`
  ${GroupView}
  query groups {
    groups {
      ...GroupView
    }
  }
`

export default async function getGroups(client : ApolloClient<any>) : Promise<Group[]> {
  try {
    const { data: { groups } } = await client.query<Query>({
      query: GET_GROUPS,
    })

    return groups
  } catch (e) {
    return []
  }
}