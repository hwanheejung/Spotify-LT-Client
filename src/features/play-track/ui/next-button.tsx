'use client'

import { FaForwardStep } from 'react-icons/fa6'
import { Tooltip } from '@/shared/ui'
import { usePlaybackStore } from '../model/playback-store'

const NextButton = () => {
  const { player, currentTrack } = usePlaybackStore()

  const isDisabled = !player || !currentTrack

  const handleClick = () => {
    if (!player) return
    player.nextTrack()
  }

  return (
    <Tooltip
      label={!isDisabled ? 'Next' : ''}
      spacing={16}
      className="flex items-center"
    >
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className={`text-gray-200 ${
          !isDisabled ? 'hover:text-gray-0' : 'cursor-not-allowed'
        }`}
        aria-label="Play next track"
      >
        <FaForwardStep size="1.3rem" />
      </button>
    </Tooltip>
  )
}

export { NextButton }
