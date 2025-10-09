import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/section'
import { formatDuration } from '@/shared/lib/time'

export type Track = {
  id: string
  name: string
  artists: {
    id: string
    name: string
  }[]
  duration_ms: number
  album: {
    id: string
    images: {
      url: string
      height: number
      width: number
    }[]
  }
}

const Songs = ({ tracks }: { tracks: Track[] }) => {
  return (
    <Section hasLink title="Songs" href="/" showShowAllText={false}>
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-3 overflow-hidden rounded-md p-2 hover:bg-gray-400"
        >
          <Image
            src={track.album.images[0].url}
            width={50}
            height={50}
            alt={track.name}
            className="rounded-sm"
          />
          <div className="flex-1 overflow-hidden">
            <div className="block w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
              {track.name}
            </div>
            <div className="block w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {track.artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link
                    href={`/artist/${artist.id}`}
                    className="hover:underline"
                  >
                    {artist.name}
                  </Link>
                  {index < track.artists.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs">{formatDuration(track.duration_ms)}</p>
        </div>
      ))}
    </Section>
  )
}

export default Songs
