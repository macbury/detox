import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Query, Group } from '../graphql'
import GroupView from '../fragments/GroupView'

export const GET_GROUP = gql`
  ${GroupView}
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      ...GroupView
    }
  }
`

export default async function getGroupQuery(client : ApolloClient<any>, groupId: string) : Promise<Group> {
  try {
    const { data: { getGroup } } = await client.query<Query>({
      query: GET_GROUP,
      variables: {
        id: groupId
      }
    })

    return getGroup
  } catch (e) {
    return null
  }
}