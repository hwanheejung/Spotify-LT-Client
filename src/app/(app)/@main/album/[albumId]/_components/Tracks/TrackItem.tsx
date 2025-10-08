'use client'

import { HiMiniPause, HiMiniPlay } from 'react-icons/hi2'
import { MusicBars } from '@/components/icons'
import useTrackControl from '@/lib/hooks/useTrackControl'
import { formatDuration } from '@/lib/utils/format-duration'
import { Tooltip } from '@/shared/ui'
import type { AlbumTrackDTO } from '@/types/albums.types'

interface TrackItemProps {
  track: AlbumTrackDTO
  albumId: string
}

const TrackItem = ({ track, albumId }: TrackItemProps) => {
  const { isPaused, isCurrent, handleStart, pause } = useTrackControl({
    trackIds: [track.id],
  })

  const handleStartClick = async () => {
    await handleStart({
      type: 'album',
      id: albumId,
      offset: {
        position: track.track_number - 1,
      },
    })
  }

  return (
    <div
      key={track.id}
      className="group flex items-center rounded-sm pr-5 text-gray-100 hover:bg-gray-500"
    >
      <div className="mx-3 flex h-5 w-5 items-center justify-center">
        {!isPaused && isCurrent ? (
          <MusicBars className="group-hover:hidden" />
        ) : (
          <p
            className={`group-hover:hidden ${
              isCurrent ? 'text-spotifyGreen' : 'text-gray-0'
            }`}
          >
            {track.track_number}
          </p>
        )}
        {isCurrent && !isPaused ? (
          <Tooltip label="Pause">
            <button
              className="hidden group-hover:block"
              onClick={pause}
              aria-label="pause"
            >
              <HiMiniPause className="h-4 w-4" />
            </button>
          </Tooltip>
        ) : (
          <Tooltip label="Play">
            <button
              className="hidden group-hover:block"
              onClick={handleStartClick}
              aria-label="play"
            >
              <HiMiniPlay className="h-4 w-4" />
            </button>
          </Tooltip>
        )}
      </div>
      <div className="flex-1 py-1 pl-2">
        <h2
          className={`font-semibold ${
            isCurrent ? 'text-spotifyGreen' : 'text-gray-0'
          }`}
        >
          {track.name}
        </h2>
        <p className="text-sm">
          {track.artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>
      <p className="text-xs">{formatDuration(track.duration_ms)}</p>
    </div>
  )
}

export default TrackItem
