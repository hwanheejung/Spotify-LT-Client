import Image from 'next/image'
import Link from 'next/link'
import type { CurrentlyPlayingDTO } from '@/types/player.types'

interface CurrentTrackProps {
  track: CurrentlyPlayingDTO
}

const CurrentTrack = ({ track }: CurrentTrackProps) => {
  return (
    <div>
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={250}
        height={250}
        style={{
          width: '100%',
          height: 'auto',
        }}
        className="rounded-md"
      />
      <p className="pt-2 text-xl font-bold">{track.name}</p>
      <Link
        href={`/artist/${track.artists[0].id}`}
        className="cursor-pointer text-gray-200 hover:text-gray-0 hover:underline"
      >
        {track.artists[0].name}
      </Link>
    </div>
  )
}

export default CurrentTrack
