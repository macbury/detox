import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { Mutation, MutationClearJobsArgs } from '../graphql'

export const CLEAR_JOBS_MUTATION = gql`
  mutation clearJobs($jobIds: [ID!]!) {
    clearJobs(jobIds: $jobIds) {
      deleted
    }
  }
`

export default async function clearJobsMutation(client : ApolloClient<any>, jobIds : [string]) : Promise<number> {
  try {
    const { data: { clearJobs } } = await client.mutate<Mutation, MutationClearJobsArgs>({
      mutation: CLEAR_JOBS_MUTATION,
      variables: { jobIds }
    })
  
    return clearJobs?.deleted || 0
  } catch (e) {
    return 0
  }
}