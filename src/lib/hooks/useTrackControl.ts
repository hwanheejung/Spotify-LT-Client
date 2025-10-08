import { useMutation } from '@apollo/client/react'
import { useRef } from 'react'
import { START_PLAYBACK } from '@/features/play-track'
import { usePlaybackStore } from '../stores/playback.store'

type PlaybackVariables =
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

export type StartPlaybackArgs = {
  deviceId: string
  positionMs?: number
} & PlaybackVariables

interface UseTrackControlProps {
  trackIds: string[]
}

const useTrackControl = ({ trackIds }: UseTrackControlProps) => {
  const { deviceId, currentTrack, isPaused, player } = usePlaybackStore()
  const [startResumePlayback] = useMutation(START_PLAYBACK)

  const isCurrent = currentTrack?.id
    ? trackIds.includes(currentTrack.id)
    : false

  const lastPlayedRef = useRef<{ id: string } | null>(null)

  const handleStart = async (variables: PlaybackVariables) => {
    const isLastPlayed = lastPlayedRef.current?.id === currentTrack?.id

    const positionMs = isLastPlayed
      ? (currentTrack?.position ?? 0) // Resume if it's the same track
      : 0 // if it's a new track, start from the beginning

    try {
      await startResumePlayback({
        variables: {
          input: { deviceId, positionMs, ...variables },
        },
      })

      if (currentTrack?.id)
        lastPlayedRef.current = {
          id: currentTrack.id,
        }
    } catch (err) {
      console.error('Failed to start playback', err)
    }
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

export default useTrackControl
