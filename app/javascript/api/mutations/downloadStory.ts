import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { DownloadStoryPayload, Mutation, MutationDownloadStoryArgs, DownloadStoryInput } from '../graphql'

export type { DownloadStoryPayload, DownloadStoryInput }

export const DOWNLOAD_STORY_MUTATION = gql`
  mutation downloadStory($input: DownloadStoryInput!) {
    downloadStory(input: $input) {
      errors
      story {
        id
        updatedAt
        attachment {
          ... on Article {
            body
          }
        }
      }
    }
  }
`

export async function downloadStoryMutation(client : ApolloClient<any>, input : DownloadStoryInput) : Promise<DownloadStoryPayload> {
  try {
    const { data: { downloadStory } } = await client.mutate<Mutation, MutationDownloadStoryArgs>({
      mutation: DOWNLOAD_STORY_MUTATION,
      variables: { input }
    })

    return downloadStory
  } catch (e) {
    return {
      story: null,
      errors: [e]
    }
  }
}
