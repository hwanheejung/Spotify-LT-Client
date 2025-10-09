'use client'

import { NextButton } from './next-button'
import { PausePlayButton } from './pause-play-button'
import { PreviousButton } from './previous-button'

const Player = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <PreviousButton />
      <PausePlayButton />
      <NextButton />
    </div>
  )
}

export { Player }
