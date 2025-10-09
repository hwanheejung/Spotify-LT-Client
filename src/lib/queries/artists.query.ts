import { gql } from '@/shared/__graphql-generated__'

export const GET_ARTIST = gql(`
  query GetArtist($artistId: String!) {
    artist(artistId: $artistId) {
      id
      name
      type
      followers {
        href
        total
      }
      genres
      images {
        url
        height
        width
      }
    }
  }
`)
