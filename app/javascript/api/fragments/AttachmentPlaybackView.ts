import gql from 'graphql-tag'

export default gql`
  fragment AttachmentPlaybackView on Playback {
    id
    position
    duration
    status
    resumedAt
  }
`