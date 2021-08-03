import { ApolloClient } from 'apollo-client'
import { Query, Story, Audio, QueryGetStoryArgs } from '../graphql'
import gql from 'graphql-tag'

export type { Story, Audio }

export const GET_AUDIO_STREAM_QUERY = gql`
  query getStory($id: ID!) {
    getStory(id: $id) {
      attachment {
        ... on Audio {
          secureUri
        }
      }
    }
  }
`

export async function getAudioStreamQuery(client : ApolloClient<any>, storyId: string) : Promise<string> {
  const { data: { getStory } } = await client.query<Query, QueryGetStoryArgs>({
    query: GET_AUDIO_STREAM_QUERY,
    variables: { id: storyId }
  })

  return ((getStory.attachment) as Audio).secureUri
}
