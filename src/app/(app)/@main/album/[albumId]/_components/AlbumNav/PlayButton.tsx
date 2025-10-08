'use client'

import { useMutation } from '@apollo/client/react'
import { HiMiniPause, HiMiniPlay } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'
import { START_PLAYBACK } from '@/lib/queries/player.query'
import { usePlaybackStore } from '@/lib/stores/playback.store'

interface PlayButtonProps {
  albumId: string
}

const PlayButton = ({ albumId }: PlayButtonProps) => {
  const { player, isPaused, deviceId } = usePlaybackStore()
  const [startResumePlayback] = useMutation(START_PLAYBACK)

  const handleStart = async () => {
    try {
      const input = {
        deviceId,
        type: 'album',
        id: albumId,
      }
      await startResumePlayback({
        variables: {
          input,
        },
      })
    } catch (err) {
      console.error('Failed to start playback', err)
    }
  }

  return (
    <button
      disabled={!player}
      className={twMerge(
        'rounded-full bg-spotifyGreen p-3 text-gray-900',
        !player && 'cursor-not-allowed opacity-50',
      )}
      onClick={isPaused ? handleStart : () => player?.togglePlay()}
      aria-label="Play"
    >
      {isPaused ? (
        <HiMiniPlay className="h-6 w-6" />
      ) : (
        <HiMiniPause className="h-6 w-6" />
      )}
    </button>
  )
}

export default PlayButton
