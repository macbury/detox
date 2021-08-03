import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { CreateGroupInput, Mutation, MutationCreateGroupArgs, CreateGroupPayload } from '../graphql'
import GroupView from '../fragments/GroupView'

export type { CreateGroupPayload, CreateGroupInput }

export const CREATE_GROUP_MUTATION = gql`
  ${GroupView}

  mutation createGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      group {
        ...GroupView
      }

      errors
    }
  }
`

export default async function createGroupMutation(client : ApolloClient<any>, input : CreateGroupInput) : Promise<CreateGroupPayload> {
  try {
    const { data: { createGroup } } = await client.mutate<Mutation, MutationCreateGroupArgs>({
      mutation: CREATE_GROUP_MUTATION,
      variables: { input }
    })

    return createGroup
  } catch (e) {
    return {
      errors: [e]
    }
  }
}