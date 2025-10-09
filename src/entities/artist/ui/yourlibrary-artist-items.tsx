import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetAlbumsArtistsQuery } from '@/shared/graphql'

type SavedArtist = NonNullable<
  NonNullable<GetAlbumsArtistsQuery['savedArtists']>[number]
>

export const ArtistCollapsedView = ({ artist }: { artist: SavedArtist }) => {
  return match(artist)
    .with(
      {
        id: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
      },
      (artist) => (
        <Link
          href={`/artist/${artist.id}`}
          className="flex items-center justify-center p-3 hover:bg-gray-500"
        >
          <Image
            src={artist.images![0]!.url!}
            alt={artist.name!}
            width={56}
            height={56}
            className="aspect-square rounded-full object-cover"
            style={{ width: '100%' }}
          />
        </Link>
      ),
    )
    .otherwise(() => null)
}

export const ArtistListView = ({ artist }: { artist: SavedArtist }) => {
  return match(artist)
    .with(
      {
        id: P.string,
        name: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
      },
      (artist) => (
        <Link
          href={`/artist/${artist.id}`}
          className="flex items-center justify-between gap-5 px-3 py-3 hover:bg-gray-500"
        >
          <div className="flex flex-1 cursor-pointer items-center gap-4 overflow-hidden">
            <Image
              src={artist.images![0]!.url!}
              alt={artist.name!}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div className="flex-1 overflow-hidden">
              <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {artist.name}
              </div>
              <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
                Artist
              </div>
            </div>
          </div>
        </Link>
      ),
    )
    .otherwise(() => null)
}

export const ArtistCompactView = ({ artist }: { artist: SavedArtist }) => {
  return match(artist)
    .with(
      {
        id: P.string,
        name: P.string,
      },
      (artist) => (
        <Link
          href={`/artist/${artist.id}`}
          className="flex items-center justify-between gap-5 px-3 py-1 hover:bg-gray-500"
        >
          <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {artist.name}
          </div>
        </Link>
      ),
    )
    .otherwise(() => null)
}

export const ArtistGridView = ({ artist }: { artist: SavedArtist }) => {
  return match(artist)
    .with(
      {
        id: P.string,
        name: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
      },
      (artist) => (
        <Link
          href={`/artist/${artist.id}`}
          className="flex flex-col gap-3 p-3 hover:bg-gray-500"
        >
          <Image
            src={artist.images![0]!.url!}
            alt={artist.name!}
            width={200}
            height={200}
            className="aspect-square rounded-full object-cover"
            style={{ width: '100%' }}
          />
          <div className="overflow-hidden">
            <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {artist.name}
            </div>
            <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
              Artist
            </div>
          </div>
        </Link>
      ),
    )
    .otherwise(() => null)
}
