import { gql } from '@/shared/graphql'

export const GET_ALBUM = gql(`
  query GetAlbum($albumId: String!) {
    album(albumId: $albumId) {
      id
      name
      images {
        url
        height
        width
      }
      artists {
        id
        name
      }
      album_type
      total_tracks
      release_date
      tracks {
        id
        name
        artists {
          name
        }
        duration_ms
        track_number
      }
    }
  }
`)
