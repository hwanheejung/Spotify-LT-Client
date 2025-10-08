import { gql } from '@apollo/client'

export const TRANSFER_PLAYBACK = gql`
  mutation ($deviceId: String!) {
    playbackTransfer(deviceId: $deviceId)
  }
`

export const START_PLAYBACK = gql`
  mutation ($input: StartResumePlaybackInput!) {
    startResumePlayback(input: $input)
  }
`

export const GET_LYRICS = gql`
  query {
    player {
      currentTrack {
        lyrics {
          available
          locked
          data {
            id
            plainLyrics
            syncedLyrics
          }
        }
      }
    }
  }
`

export const GET_QUEUE = gql`
  query {
    player {
      currentTrack {
        id
        name
        album {
          id
          name
          images {
            url
          }
        }
        artists {
          id
          name
        }
        lyrics {
          available
        }
      }

      queue {
        id
        name
        album {
          id
          name
          images {
            url
          }
        }
        artists {
          id
          name
        }
      }
    }
  }
`
