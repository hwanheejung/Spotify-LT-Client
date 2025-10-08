import Image from 'next/image'
import Link from 'next/link'
import { usePlaybackStore } from '@/lib/stores/playback.store'
import type { CurrentlyPlayingDTO, QueueItemDTO } from '@/shared/api'

interface TrackProps {
  track: QueueItemDTO | CurrentlyPlayingDTO
}

const Track = ({ track }: TrackProps) => {
  const { currentTrack } = usePlaybackStore()

  return (
    <div className="flex items-center gap-3 overflow-hidden py-3">
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={50}
        height={50}
        className="rounded-sm"
      />
      <div className="flex-1 overflow-hidden">
        <p
          className={`block overflow-hidden text-ellipsis whitespace-nowrap ${
            currentTrack?.id === track.id && 'text-spotifyGreen'
          }`}
        >
          {track.name}
        </p>
        <Link
          href={`/artist/${track.artists[0].id}`}
          className="cursor-pointer text-xs text-gray-200 hover:text-gray-0 hover:underline"
        >
          {track.artists[0].name}
        </Link>
      </div>
    </div>
  )
}

export default Track
