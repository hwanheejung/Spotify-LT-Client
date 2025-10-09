import { gql } from '@/shared/graphql'

export const TRANSFER_PLAYBACK = gql(`
  mutation TransferPlayback($deviceId: String!) {
    playbackTransfer(deviceId: $deviceId)
  }
`)

export const START_PLAYBACK = gql(`
  mutation StartPlayback($input: StartResumePlaybackInput!) {
    startResumePlayback(input: $input)
  }
`)

export const GET_LYRICS = gql(`
  query GetLyrics {
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
`)

export const GET_QUEUE = gql(`
  query GetQueue {
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
`)
