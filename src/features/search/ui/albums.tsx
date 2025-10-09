import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import { Section } from '@/components/section'
import type { GetSearchResultsQuery } from '@/shared/__graphql-generated__/dto'
import { parseDate } from '@/shared/lib/time'

type SearchData = NonNullable<GetSearchResultsQuery['search']>
type Album = NonNullable<NonNullable<SearchData['albums']>[number]>

const Albums = ({ albums }: { albums: Album[] }) => {
  return match(albums)
    .with(
      P.when((albums) => Array.isArray(albums) && albums.length > 0),
      (albums) => (
        <Section title="Albums" hasLink href="/">
          <div className="grid grid-cols-4">
            {albums.map((album) =>
              match(album)
                .with(
                  {
                    id: P.string,
                    name: P.string,
                    images: P.when(
                      (imgs) => Array.isArray(imgs) && imgs.length > 0,
                    ),
                    artists: P.when(
                      (arts) => Array.isArray(arts) && arts.length > 0,
                    ),
                    release_date: P.string,
                  },
                  (album) => (
                    <div
                      key={album.id}
                      className="rounded-md p-3 hover:bg-gray-600"
                    >
                      <Image
                        src={album.images![0]!.url!}
                        alt={album.name!}
                        width={100}
                        height={100}
                        className="mb-4 aspect-square rounded-lg object-cover"
                        style={{
                          width: '100%',
                        }}
                      />
                      <Link
                        href={`/album/${album.id}`}
                        className="mt-2 text-sm font-semibold hover:underline"
                      >
                        {album.name}
                      </Link>
                      <p className="text-xs text-gray-200">
                        {parseDate(album.release_date!).year} •{' '}
                        {album.artists![0]!.name}
                      </p>
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

export { Albums }
