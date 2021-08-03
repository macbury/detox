import gql from 'graphql-tag'
import PosterImageView from './PosterImageView'
import AttachmentPlaybackView from './AttachmentPlaybackView'

export default gql`
  ${PosterImageView}
  ${AttachmentPlaybackView}

  fragment StoryFeedItemView on Story {
    id
    channel {
      id
    }

    publishedAt
    updatedAt

    summary
    title
    permalink
    domain
    isRead
    isFavorite

    attachment {
      __typename

      ... on Audio {
        id
        duration
        poster(variant: Desktop) {
          ...PosterImageView
        }

        playback {
          ...AttachmentPlaybackView
        }
      }

      ... on Video {
        id
        duration
        width
        height
        poster(variant: $variant) {
          ...PosterImageView
        }

        playback {
          ...AttachmentPlaybackView
        }
      }

      ... on Article {
        commentsUrl
        id
        poster(variant: $variant) {
          ...PosterImageView
        }
      }
    }
  }
`