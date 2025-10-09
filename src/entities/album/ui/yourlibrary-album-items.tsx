import Image from 'next/image'
import Link from 'next/link'
import { match, P } from 'ts-pattern'
import type { GetAlbumsArtistsQuery } from '@/shared/graphql'
import { capitalizeFirstLetter } from '@/shared/lib/text'
import { getTimeAgo } from '@/shared/lib/time'
import { useLayoutStore } from '@/shared/ui'

type SavedAlbum = NonNullable<
  NonNullable<GetAlbumsArtistsQuery['savedAlbums']>[number]
>
type Album = NonNullable<SavedAlbum['album']>

export const AlbumCollapsedView = ({ album }: { album: Album }) => {
  return match(album).with(
    {
      id: P.string,
      images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
    },
    (album) => (
      <Link
        href={`/album/${album.id}`}
        className="flex items-center justify-center p-3 hover:bg-gray-500"
      >
        <Image
          src={album.images![0]!.url!}
          alt={album.name}
          width={56}
          height={56}
          className="aspect-square rounded-sm object-cover"
          style={{ width: '100%' }}
        />
      </Link>
    ),
  )
}

export const AlbumListView = ({ item }: { item: SavedAlbum }) => {
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  return match(item).with(
    {
      album: {
        id: P.string,
        name: P.string,
        type: P.string,
        images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
        artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
      },
      added_at: P.string,
    },
    ({ album, added_at }) => (
      <Link
        href={`/album/${album!.id}`}
        className="flex items-center justify-between gap-5 px-3 py-3 hover:bg-gray-500"
      >
        <div className="flex flex-1 cursor-pointer items-center gap-4 overflow-hidden">
          <Image
            src={album!.images![0]!.url!}
            alt={album!.name}
            width={56}
            height={56}
            className="rounded-sm"
          />
          <div className="flex-1 overflow-hidden">
            <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {album!.name}
            </div>
            <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
              {capitalizeFirstLetter(album!.type!)} • {album!.artists![0]!.name}
            </div>
          </div>
        </div>
        <div
          className={`flex-shrink-0 text-xs text-gray-200 ${
            leftPanelState !== 'EXPANDED' && 'hidden'
          }`}
        >
          {getTimeAgo(added_at)}
        </div>
      </Link>
    ),
  )
}

export const AlbumCompactView = ({ item }: { item: SavedAlbum }) => {
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  return match(item).with(
    {
      album: {
        id: P.string,
        name: P.string,
      },
      added_at: P.string,
    },
    ({ album, added_at }) => (
      <Link
        href={`/album/${album!.id}`}
        className="flex items-center justify-between gap-5 px-3 py-1 hover:bg-gray-500"
      >
        <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {album!.name}
        </div>
        <div
          className={`flex-shrink-0 text-xs text-gray-200 ${
            leftPanelState !== 'EXPANDED' && 'hidden'
          }`}
        >
          {getTimeAgo(added_at)}
        </div>
      </Link>
    ),
  )
}

export const AlbumGridView = ({ album }: { album: Album }) => {
  return match(album).with(
    {
      id: P.string,
      name: P.string,
      type: P.string,
      images: P.when((imgs) => Array.isArray(imgs) && imgs.length > 0),
      artists: P.when((arts) => Array.isArray(arts) && arts.length > 0),
    },
    (album) => (
      <Link
        href={`/album/${album.id}`}
        className="flex flex-col gap-3 p-3 hover:bg-gray-500"
      >
        <Image
          src={album.images![0]!.url!}
          alt={album.name}
          width={200}
          height={200}
          className="aspect-square rounded-md object-cover"
          style={{ width: '100%' }}
        />
        <div className="overflow-hidden">
          <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {album.name}
          </div>
          <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
            {capitalizeFirstLetter(album.type!)} • {album.artists![0]!.name}
          </div>
        </div>
      </Link>
    ),
  )
}
