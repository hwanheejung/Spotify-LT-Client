'use client'

import { Player, useWebPlayback } from '@/features/play-track'
import { CurrentTrack } from './current-track'
import { RightPanelNav } from './rightpanel-nav'
import { SeekBar } from './seek-bar'

const PlayingBar = async () => {
  useWebPlayback()

  return (
    <div className="grid w-full grid-cols-3 px-5 py-2">
      <CurrentTrack />
      <div className="flex flex-col justify-center gap-2">
        <Player />
        <SeekBar />
      </div>
      <RightPanelNav />
    </div>
  )
}

export { PlayingBar }
