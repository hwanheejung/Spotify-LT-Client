import { gql } from '@/shared/graphql'

export const GET_NEW_RELEASES = gql(`
  query GetNewReleases($offset: Int = 0, $limit: Int = 4) {
    newReleases(offset: $offset, limit: $limit) {
      id
      name
      images {
        url
      }
      artists {
        id
        name
      }
    }
  }
`)
