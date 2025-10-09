import { gql } from '@/shared/__graphql-generated__'

export const GET_ALBUMS_ARTISTS = gql(`
  query GetAlbumsArtists($offset: Int = 0, $limit: Int = 20, $after: String) {
    savedAlbums: savedAlbums(offset: $offset, limit: $limit) {
      added_at
      album {
        id
        images {
          url
        }
        name
        type
        artists {
          name
        }
      }
    }
    savedArtists: savedArtists(after: $after) {
      id
      name
      images {
        url
      }
    }
  }
`)
