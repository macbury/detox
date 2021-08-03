import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { UpdateGroupInput, Mutation, MutationUpdateGroupArgs, UpdateGroupPayload } from '../graphql'
import GroupView from '../fragments/GroupView'

export type { UpdateGroupInput, UpdateGroupPayload }

export const UPDATE_GROUP_MUTATION = gql`
  ${GroupView}

  mutation updateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      group {
        ...GroupView
      }
      errors
    }
  }
`

export default async function updateGroupMutation(client : ApolloClient<any>, input : UpdateGroupInput) {
  try {
    const { data: { updateGroup } } = await client.mutate<Mutation, MutationUpdateGroupArgs>({
      mutation: UPDATE_GROUP_MUTATION,
      variables: { input }
    })

    return updateGroup
  } catch (e) {
    return {
      group: null,
      errors: [e]
    }
  }
}
