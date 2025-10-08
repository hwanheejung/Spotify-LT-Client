import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore } from '@/lib/stores/layout.store'
import { capitalizeFirstLetter } from '@/lib/utils/capitalize-first-letter'
import { getTimeAgo } from '@/lib/utils/get-time-ago'
import type { AlbumItemDTO } from '@/types/albums.types'

export const AlbumCollapsedView = ({
  album,
}: {
  album: AlbumItemDTO['album']
}) => (
  <Link
    href={`/album/${album.id}`}
    className="flex items-center justify-center p-3 hover:bg-gray-500"
  >
    <Image
      src={album.images[0].url}
      alt="Album Cover"
      width={56}
      height={56}
      className="aspect-square rounded-sm object-cover"
      style={{
        width: '100%',
      }}
    />
  </Link>
)

export const AlbumListView = ({
  item: { album, added_at },
}: {
  item: AlbumItemDTO
}) => {
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  return (
    <Link
      href={`/album/${album.id}`}
      className="flex items-center justify-between gap-5 px-3 py-3 hover:bg-gray-500"
    >
      <div className="flex flex-1 cursor-pointer items-center gap-4 overflow-hidden">
        <Image
          src={album.images[0].url}
          alt="Album Cover"
          width={56}
          height={56}
          className="rounded-sm"
        />

        <div className="flex-1 overflow-hidden">
          <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {album.name}
          </div>
          <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
            {capitalizeFirstLetter(album.type)} • {album.artists[0].name}
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
  )
}

export const AlbumCompactView = ({
  item: { album, added_at },
}: {
  item: AlbumItemDTO
}) => {
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  return (
    <Link
      href={`/album/${album.id}`}
      className="flex items-center justify-between gap-5 px-3 py-1 hover:bg-gray-500"
    >
      <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {album.name}
      </div>
      <div
        className={`flex-shrink-0 text-xs text-gray-200 ${
          leftPanelState !== 'EXPANDED' && 'hidden'
        }`}
      >
        {getTimeAgo(added_at)}
      </div>
    </Link>
  )
}

export const AlbumGridView = ({ album }: { album: AlbumItemDTO['album'] }) => (
  <Link
    href={`/album/${album.id}`}
    className="flex flex-col gap-3 p-3 hover:bg-gray-500"
  >
    <Image
      src={album.images[0].url}
      alt="Album Cover"
      width={200}
      height={200}
      className="aspect-square rounded-md object-cover"
      style={{
        width: '100%',
      }}
    />
    <div className="overflow-hidden">
      <div className="block w-[90%] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {album.name}
      </div>
      <div className="block items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
        {capitalizeFirstLetter(album.type)} • {album.artists[0].name}
      </div>
    </div>
  </Link>
)
