import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetSearchResultsQuery } from '@/shared/__graphql-generated__/dto'
import { Section } from './section'

type SearchData = NonNullable<GetSearchResultsQuery['search']>
type Artist = NonNullable<NonNullable<SearchData['artists']>[number]>

const Artists = ({ artists }: { artists: Artist[] }) => {
  return match(artists)
    .with(
      P.when((artists) => Array.isArray(artists) && artists.length > 0),
      (artists) => (
        <Section title="Artists" hasLink href="/">
          <div className="grid grid-cols-4">
            {artists.map((artist) =>
              match(artist)
                .with(
                  {
                    id: P.string,
                    name: P.string,
                    images: P.when(
                      (imgs) => Array.isArray(imgs) && imgs.length > 0,
                    ),
                  },
                  (artist) => (
                    <div
                      key={artist.id}
                      className="rounded-md p-3 hover:bg-gray-600"
                    >
                      <Image
                        src={artist.images![0]!.url!}
                        alt={artist.name!}
                        width={100}
                        height={100}
                        style={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          objectFit: 'cover',
                        }}
                        className="mb-4 rounded-full"
                      />
                      <Link
                        href={`/artist/${artist.id}`}
                        className="mt-2 text-sm font-semibold hover:underline"
                      >
                        {artist.name}
                      </Link>
                      <p className="text-xs text-gray-200">{artist.type}</p>
                    </div>
                  ),
                )
                .otherwise(() => null),
            )}
          </div>
        </Section>
      ),
    )
    .otherwise(() => null)
}

export { Artists }
