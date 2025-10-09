import { useMutation } from '@apollo/client/react'
import { useRef } from 'react'
import { match, P } from 'ts-pattern'
import { START_PLAYBACK } from '@/features/play-track'
import { usePlaybackStore } from '../model/playback-store'

const useTrackControl = ({ trackIds }: TParams) => {
  const { deviceId, currentTrack, isPaused, player } = usePlaybackStore()
  const [startResumePlayback] = useMutation(START_PLAYBACK)

  const isCurrent = currentTrack?.id
    ? trackIds.includes(currentTrack.id)
    : false

  const lastPlayedRef = useRef<{ id: string } | null>(null)

  const handleStart = async (variables: TPlaybackVariables) => {
    const isLastPlayed = lastPlayedRef.current?.id === currentTrack?.id

    const positionMs = isLastPlayed
      ? (currentTrack?.position ?? 0) // Resume if it's the same track
      : 0 // if it's a new track, start from the beginning

    return match(deviceId)
      .with(P.string, async (id) => {
        try {
          await startResumePlayback({
            variables: {
              input: { deviceId: id, positionMs, ...variables },
            },
          })

          if (currentTrack?.id)
            lastPlayedRef.current = {
              id: currentTrack.id,
            }
        } catch (err) {
          console.error('Failed to start playback', err)
        }
      })
      .otherwise(() => {
        console.warn('No active device found to start playback.')
        return Promise.resolve()
      })
  }

  const pause = () => {
    if (player) player.togglePlay()
  }

  return {
    isPaused,
    isCurrent,
    handleStart,
    pause,
  }
}

export { useTrackControl }

type TParams = {
  trackIds: string[]
}

type TPlaybackVariables =
  | {
      type: 'album' | 'playlist'
      id: string
      offset: { position: number }
    }
  | {
      type: 'artist'
      id: string
    }
  | {
      type: 'track'
      ids: string[]
    }
