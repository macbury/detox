import gql from 'graphql-tag'

export default gql`
  fragment StoryDetailsView on Story {
    id
    title
    domain
    permalink
    publishedAt
    isFavorite
    isRead
    updatedAt
    summary

    channel {
      id
      name
    }
  }
`