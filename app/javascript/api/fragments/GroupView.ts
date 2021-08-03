import gql from 'graphql-tag'

export default gql`
  fragment GroupView on Group {
    id
    name
    icon
    unread

    channels {
      id
    }
  }
`