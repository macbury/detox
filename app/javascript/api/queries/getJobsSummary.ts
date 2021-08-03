import { ApolloClient, ObservableQuery } from 'apollo-client'
import { JobBlueprint, JobKind, QueryBackgroundJobsArgs } from '../graphql'
import gql from 'graphql-tag'
import JobListViewFragment from '../fragments/JobListView'

export type { JobBlueprint, JobKind }

export type TJobsStatus = {
  current: {
    jobs: Array<JobBlueprint>
  }

  processing: {
    totalCount: number
  }

  bench: {
    totalCount: number
  }

  failed: {
    totalCount: number
  }
}

export type TJobsStatusObservableQuery = ObservableQuery<TJobsStatus>

export const GET_JOBS_SUMMARY = gql`
  ${JobListViewFragment}

  query jobsStatus($kind: JobKind!) {
    current: backgroundJobs(kind: $kind) {
      jobs: nodes {
        ...JobListView
      }
    }

    processing: backgroundJobs(kind: Processing) {
      totalCount
    }

    bench: backgroundJobs(kind: Bench) {
      totalCount
    }

    failed: backgroundJobs(kind: WithErrors) {
      totalCount
    }
  }
`

export default function getJobsSummary(client : ApolloClient<any>, kind: JobKind) : TJobsStatusObservableQuery {
  return client.watchQuery<TJobsStatus, QueryBackgroundJobsArgs>({
    query: GET_JOBS_SUMMARY,
    variables: { kind }
  })
}