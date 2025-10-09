import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetQueueQuery } from '@/shared/__graphql-generated__/dto'

type CurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>

interface CurrentTrackProps {
  track: CurrentTrack
}

const NoTrack = () => (
  <div className="flex items-center justify-center p-5 text-gray-200">
    No track playing
  </div>
)

const CurrentTrack = ({ track }: CurrentTrackProps) => {
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
    .otherwise(() => <NoTrack />)
}

export default CurrentTrack
