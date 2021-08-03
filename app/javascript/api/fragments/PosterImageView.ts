import gql from 'graphql-tag'

export default gql`
  fragment PosterImageView on Poster {
    id
    blurhash
    height
    width
    url
    colors {
      background
      foreground
      accent
    }
  }
`