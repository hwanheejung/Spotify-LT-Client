'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import Image from 'next/image'
import Link from 'next/link'
import { GET_ALBUM } from '@/lib/queries/albums.query'
import { capitalizeFirstLetter } from '@/lib/utils/capitalize-first-letter'
import { parseDate } from '@/lib/utils/parse-date'
import type { AlbumDTO } from '@/types/albums.types'

const AlbumOverview = ({ albumId }: { albumId: string }) => {
  const { data } = useSuspenseQuery<{ album: AlbumDTO }>(GET_ALBUM, {
    variables: { albumId },
  })
  const { name, images, artists, album_type, total_tracks, release_date } =
    data.album
  const { year } = parseDate(release_date)

  return (
    <div className="px-5 pb-7 pt-10">
      <div className="flex items-end gap-5">
        <Image
          src={images[0].url}
          alt="Album Cover"
          width={150}
          height={150}
          className="rounded-sm"
        />
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm">{capitalizeFirstLetter(album_type)}</p>
          <h1 className="text-4xl font-extrabold">{name}</h1>
          <p className="text-xs text-gray-200">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="font-bold text-gray-0 hover:underline"
              >
                {artist.name}
              </Link>
            ))}
            • {year} • {total_tracks} songs
          </p>
        </div>
      </div>
    </div>
  )
}

export default AlbumOverview
