'use client'

import { HiMiniPause, HiMiniPlay } from 'react-icons/hi2'
import { match, P } from 'ts-pattern'
import { MusicBars } from '@/components/icons'
import useTrackControl from '@/lib/hooks/useTrackControl'
import type { AlbumTrack } from '@/shared/__graphql-generated__'
import { formatDuration } from '@/shared/lib/time'
import { Tooltip } from '@/shared/ui'

interface TrackItemProps {
  track: AlbumTrack
  albumId: string
}

const TrackItem = ({ track, albumId }: TrackItemProps) => {
  const { isPaused, isCurrent, handleStart, pause } = useTrackControl({
    trackIds: track.id ? [track.id] : [],
  })

  const handleStartClick = async () => {
    await handleStart({
      type: 'album',
      id: albumId,
      offset: {
        position: track.track_number! - 1,
      },
    })
  }

  // 트랙 번호/재생 상태 표시 로직
  const renderTrackIndicator = () => {
    return match({ isCurrent, isPaused })
      .with({ isCurrent: true, isPaused: false }, () => (
        <MusicBars className="group-hover:hidden" />
      ))
      .with({ isCurrent: true }, () => (
        <p className="text-spotifyGreen group-hover:hidden">
          {track.track_number}
        </p>
      ))
      .otherwise(() => (
        <p className="text-gray-0 group-hover:hidden">{track.track_number}</p>
      ))
  }

  // 재생/일시정지 버튼 로직
  const renderPlayButton = () => {
    return match({ isCurrent, isPaused })
      .with({ isCurrent: true, isPaused: false }, () => (
        <Tooltip label="Pause">
          <button
            className="hidden group-hover:block"
            onClick={pause}
            aria-label="pause"
          >
            <HiMiniPause className="h-4 w-4" />
          </button>
        </Tooltip>
      ))
      .otherwise(() => (
        <Tooltip label="Play">
          <button
            className="hidden group-hover:block"
            onClick={handleStartClick}
            aria-label="play"
          >
            <HiMiniPlay className="h-4 w-4" />
          </button>
        </Tooltip>
      ))
  }

  // 트랙 이름 스타일 로직
  const trackNameClass = match(isCurrent)
    .with(true, () => 'font-semibold text-spotifyGreen')
    .otherwise(() => 'font-semibold text-gray-0')

  // 아티스트 이름 렌더링 로직
  const renderArtists = () => {
    return match(track)
      .with(
        {
          artists: P.when(
            (artists) => Array.isArray(artists) && artists.length > 0,
          ),
        },
        (track) =>
          track
            .artists!.map((artist) => artist?.name)
            .filter(Boolean)
            .join(', '),
      )
      .otherwise(() => 'Unknown Artist')
  }

  return match(track)
    .with(
      {
        id: P.string,
        name: P.string,
      },
      (track) => (
        <div
          key={track.id}
          className="group flex items-center rounded-sm pr-5 text-gray-100 hover:bg-gray-500"
        >
          <div className="mx-3 flex h-5 w-5 items-center justify-center">
            {renderTrackIndicator()}
            {renderPlayButton()}
          </div>
          <div className="flex-1 py-1 pl-2">
            <h2 className={trackNameClass}>{track.name}</h2>
            <p className="text-sm">{renderArtists()}</p>
          </div>
          <p className="text-xs">{formatDuration(track.duration_ms!)}</p>
        </div>
      ),
    )
    .otherwise(() => null)
}

export default TrackItem
