import { ApolloClient } from 'apollo-client'
import { Query, QueryGetBackgroundJobArgs, JobBlueprint } from '../graphql'
import gql from 'graphql-tag'

export const GET_JOB_SUMMARY = gql`
  query getBackgroundJob($id: ID!) {
    getBackgroundJob(id: $id) {
      id
      jobClass
      arguments
      createdAt
      
      lockKey
      lockedAt
      
      error
      backtrace
    }
  }
`

export default async function getJob(client : ApolloClient<any>, jobId: string) : Promise<JobBlueprint> {
  const { data: { getBackgroundJob } } = await client.query<Query, QueryGetBackgroundJobArgs>({
    query: GET_JOB_SUMMARY,
    variables: { id: jobId }
  })

  return getBackgroundJob
}