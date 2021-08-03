import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { UpdateSettingInput, Mutation, MutationUpdateSettingsArgs } from '../graphql'

export type { UpdateSettingInput }

export const UPDATE_SETTING_MUTATION = gql`
  mutation updateSettings($input: UpdateSettingInput!) {
    updateSettings(input: $input) {
      errors
    }
  }
`

export type UpdateSettingResult = {
  success: boolean
  errors: string[]
}

export async function updateSettingMutation(client : ApolloClient<any>, input : UpdateSettingInput) : Promise<UpdateSettingResult> {
  try {
    const { data: { updateSettings } } = await client.mutate<Mutation, MutationUpdateSettingsArgs>({
      mutation: UPDATE_SETTING_MUTATION,
      variables: { input }
    })

    return {
      success: !updateSettings.errors,
      errors: updateSettings.errors || []
    }
  } catch (e) {
    return {
      success: false,
      errors: [e]
    }
  }
}
