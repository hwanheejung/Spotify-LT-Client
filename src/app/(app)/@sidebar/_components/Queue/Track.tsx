'use client'

import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import { usePlaybackStore } from '@/features/play-track'
import type { GetQueueQuery } from '@/shared/graphql'

type CurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>
type QueueTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['queue'][number]
>

interface TrackProps {
  track: QueueTrack | CurrentTrack
}

const NoTrack = () => (
  <div className="text-gray-200">Track information unavailable</div>
)

const Track = ({ track }: TrackProps) => {
  const { currentTrack } = usePlaybackStore()

  return match(track)
    .with(
      {
        id: P.string,
        name: P.string,
        album: {
          images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        },
        artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
      },
      (track) => {
        const isCurrentTrack = currentTrack?.id === track.id

        return (
          <div className="flex items-center gap-3 overflow-hidden py-3">
            <Image
              src={track.album!.images![0]!.url!}
              alt={track.name!}
              width={50}
              height={50}
              className="rounded-sm"
            />
            <div className="flex-1 overflow-hidden">
              <p
                className={`block overflow-hidden text-ellipsis whitespace-nowrap ${
                  isCurrentTrack && 'text-spotifyGreen'
                }`}
              >
                {track.name}
              </p>
              {match(track.artists![0])
                .with(
                  {
                    id: P.string,
                    name: P.string,
                  },
                  (artist) => (
                    <Link
                      href={`/artist/${artist.id}`}
                      className="cursor-pointer text-xs text-gray-200 hover:text-gray-0 hover:underline"
                    >
                      {artist.name}
                    </Link>
                  ),
                )
                .otherwise(() => (
                  <span className="text-xs text-gray-200">Unknown Artist</span>
                ))}
            </div>
          </div>
        )
      },
    )
    .otherwise(() => <NoTrack />)
}

export default Track
