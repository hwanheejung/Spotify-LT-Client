'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { match, P } from 'ts-pattern'
import { GET_ALBUM } from '@/lib/queries/albums.query'
import type { GetAlbumQuery } from '@/shared/__graphql-generated__'
import { capitalizeFirstLetter } from '@/shared/lib/text'
import { parseDate } from '@/shared/lib/time'

const AlbumOverviewLoading = () => (
  <div className="flex items-center justify-center px-5 pb-7 pt-10">
    <div className="text-gray-200">Loading album...</div>
  </div>
)

const NoAlbumData = () => (
  <div className="flex items-center justify-center px-5 pb-7 pt-10">
    <div className="text-gray-200">Album not found</div>
  </div>
)

const AlbumOverviewContent = ({ albumId }: { albumId: string }) => {
  const { data } = useSuspenseQuery<GetAlbumQuery>(GET_ALBUM, {
    variables: { albumId },
  })

  return match(data.album)
    .with(
      {
        id: P.string,
        name: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
        album_type: P.string,
        total_tracks: P.number,
        release_date: P.string,
      },
      (album) => {
        const { year } = parseDate(album.release_date)

        return (
          <div className="px-5 pb-7 pt-10">
            <div className="flex items-end gap-5">
              <Image
                src={album.images![0]!.url!}
                alt={album.name}
                width={150}
                height={150}
                className="rounded-sm"
              />
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm">
                  {capitalizeFirstLetter(album.album_type!)}
                </p>
                <h1 className="text-4xl font-extrabold">{album.name}</h1>
                <p className="text-xs text-gray-200">
                  {match(album)
                    .with(
                      {
                        artists: P.when(
                          (arts) => Array.isArray(arts) && arts.length > 0,
                        ),
                      },
                      (album) =>
                        album.artists!.map((artist, idx) => (
                          <span key={artist?.id || idx}>
                            <Link
                              href={`/artist/${artist?.id}`}
                              className="font-bold text-gray-0 hover:underline"
                            >
                              {artist?.name}
                            </Link>
                            {idx < album.artists!.length - 1 && ', '}
                          </span>
                        )),
                    )
                    .otherwise(() => 'Unknown Artist')}
                  • {year} • {album.total_tracks} songs
                </p>
              </div>
            </div>
          </div>
        )
      },
    )
    .otherwise(() => <NoAlbumData />)
}

const AlbumOverview = ({ albumId }: { albumId: string }) => {
  return (
    <Suspense fallback={<AlbumOverviewLoading />}>
      <AlbumOverviewContent albumId={albumId} />
    </Suspense>
  )
}

export default AlbumOverview
