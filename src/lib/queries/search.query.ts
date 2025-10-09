import { gql } from '@apollo/client'

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($query: String!) {
    search(query: $query) {
      albums {
        id
        name
        album_type
        release_date
        images {
          url
          height
          width
        }
        artists {
          id
          name
        }
      }
      artists {
        id
        name
        type
        images {
          url
          height
          width
        }
      }
      tracks {
        id
        name
        album {
          id
          images {
            url
            height
            width
          }
        }
        duration_ms
        artists {
          id
          name
        }
      }
    }
  }
`
