import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetSearchResultsQuery } from '@/shared/__graphql-generated__/dto'
import { formatDuration } from '@/shared/lib/time'
import { Section } from './section'

type SearchData = NonNullable<GetSearchResultsQuery['search']>
type Track = NonNullable<NonNullable<SearchData['tracks']>[number]>

const Songs = ({ tracks }: { tracks: Track[] }) => {
  return match(tracks)
    .with(
      P.when((tracks) => Array.isArray(tracks) && tracks.length > 0),
      (tracks) => (
        <Section hasLink title="Songs" href="/" showShowAllText={false}>
          {tracks.map((track) =>
            match(track)
              .with(
                {
                  id: P.string,
                  name: P.string,
                  album: {
                    images: P.when(
                      (imgs) => Array.isArray(imgs) && imgs.length > 0,
                    ),
                  },
                  artists: P.when(
                    (arts) => Array.isArray(arts) && arts.length > 0,
                  ),
                  duration_ms: P.number,
                },
                (track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 overflow-hidden rounded-md p-2 hover:bg-gray-400"
                  >
                    <Image
                      src={track.album!.images![0]!.url!}
                      width={50}
                      height={50}
                      alt={track.name!}
                      className="rounded-sm"
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="block w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                        {track.name}
                      </div>
                      <div className="block w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                        {track.artists!.map((artist, index) =>
                          match(artist)
                            .with(
                              { id: P.string, name: P.string },
                              (artist) => (
                                <span key={artist.id}>
                                  <Link
                                    href={`/artist/${artist.id}`}
                                    className="hover:underline"
                                  >
                                    {artist.name}
                                  </Link>
                                  {index < track.artists!.length - 1 && ', '}
                                </span>
                              ),
                            )
                            .otherwise(() => null),
                        )}
                      </div>
                    </div>
                    <p className="text-xs">
                      {formatDuration(track.duration_ms!)}
                    </p>
                  </div>
                ),
              )
              .otherwise(() => null),
          )}
        </Section>
      ),
    )
    .otherwise(() => null)
}

export { Songs }
