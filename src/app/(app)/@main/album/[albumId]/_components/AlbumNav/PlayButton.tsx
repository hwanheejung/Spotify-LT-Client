'use client'

import { useMutation } from '@apollo/client/react'
import { HiMiniPause, HiMiniPlay } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'
import { match, P } from 'ts-pattern'
import { START_PLAYBACK } from '@/features/play-track'
import { usePlaybackStore } from '@/lib/stores/playback.store'

interface PlayButtonProps {
  albumId: string
}

const PlayButton = ({ albumId }: PlayButtonProps) => {
  const { player, isPaused, deviceId } = usePlaybackStore()
  const [startResumePlayback] = useMutation(START_PLAYBACK)

  const handleStart = async () => {
    return match({ deviceId, albumId })
      .with(
        {
          deviceId: P.string,
          albumId: P.string,
        },
        async ({ deviceId, albumId }) => {
          try {
            await startResumePlayback({
              variables: {
                input: {
                  deviceId,
                  type: 'album',
                  id: albumId,
                },
              },
            })
          } catch (err) {
            console.error('Failed to start playback', err)
          }
        },
      )
      .otherwise(() => {
        console.warn('Device ID or Album ID is missing')
      })
  }

  const handleClick = () => {
    return match({ isPaused, player })
      .with({ isPaused: true }, () => handleStart())
      .with({ isPaused: false, player: P.not(P.nullish) }, ({ player }) =>
        player.togglePlay(),
      )
      .otherwise(() => {
        console.warn('Player not available')
      })
  }

  const isDisabled = match(player)
    .with(P.nullish, () => true)
    .otherwise(() => false)

  const buttonClass = match(player)
    .with(P.nullish, () =>
      twMerge(
        'rounded-full bg-spotifyGreen p-3 text-gray-900',
        'cursor-not-allowed opacity-50',
      ),
    )
    .otherwise(() => 'rounded-full bg-spotifyGreen p-3 text-gray-900')

  const renderIcon = () => {
    return match(isPaused)
      .with(true, () => <HiMiniPlay className="h-6 w-6" />)
      .otherwise(() => <HiMiniPause className="h-6 w-6" />)
  }

  return (
    <button
      disabled={isDisabled}
      className={buttonClass}
      onClick={handleClick}
      aria-label={isPaused ? 'Play' : 'Pause'}
    >
      {renderIcon()}
    </button>
  )
}

export default PlayButton
