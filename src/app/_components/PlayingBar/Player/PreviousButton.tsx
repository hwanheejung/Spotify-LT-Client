'use client'

import { FaBackwardStep } from 'react-icons/fa6'
import { usePlaybackStore } from '@/lib/stores/playback.store'
import { Tooltip } from '@/shared/ui'

const PreviousButton = () => {
  const { player, currentTrack } = usePlaybackStore()

  const isDisabled = !player || !currentTrack

  const handleClick = () => {
    if (!player) return
    player.previousTrack()
  }

  return (
    <Tooltip
      label={!isDisabled ? 'Previous' : ''}
      spacing={16}
      className="flex items-center"
    >
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className={`text-gray-200 ${
          !isDisabled ? 'hover:text-gray-0' : 'cursor-not-allowed'
        }`}
        aria-label="Play previous track"
      >
        <FaBackwardStep size="1.3rem" />
      </button>
    </Tooltip>
  )
}

export default PreviousButton
