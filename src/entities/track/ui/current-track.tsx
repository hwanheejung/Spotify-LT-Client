import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetQueueQuery } from '@/shared/graphql'
import { Skeleton, SkeletonText } from '@/shared/ui'

type CurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>

const CurrentTrack = ({ track }: TProps) => {
  return match(track)
    .with(
      {
        name: P.string,
        album: {
          images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        },
        artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
      },
      (track) => (
        <div>
          <Image
            src={track.album!.images![0]!.url!}
            alt={track.name!}
            width={250}
            height={250}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className="rounded-md"
          />
          <p className="pt-2 text-xl font-bold">{track.name}</p>
          {match(track.artists![0])
            .with(
              {
                id: P.string,
                name: P.string,
              },
              (artist) => (
                <Link
                  href={`/artist/${artist.id}`}
                  className="cursor-pointer text-gray-200 hover:text-gray-0 hover:underline"
                >
                  {artist.name}
                </Link>
              ),
            )
            .otherwise(() => (
              <span className="text-gray-200">Unknown Artist</span>
            ))}
        </div>
      ),
    )
    .otherwise(() => null)
}

export { CurrentTrack, CurrentTrackSkeleton }

const CurrentTrackSkeleton = () => (
  <div>
    <Skeleton className="mb-3 h-60 w-full" />
    <SkeletonText width="5rem" lineHeight="1.5rem" className="mb-3" />
    <SkeletonText width="8rem" lineHeight="1rem" />
  </div>
)

type TProps = {
  track: CurrentTrack
}
