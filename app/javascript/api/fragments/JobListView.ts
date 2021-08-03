import gql from 'graphql-tag'

export default gql`
  fragment JobListView on JobBlueprint {
    id
    jobClass
    runAt
    lockedAt
    error
  }
`