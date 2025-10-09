'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { Suspense } from 'react'
import { match } from 'ts-pattern'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import type { GetAlbumsArtistsQuery } from '@/shared/__graphql-generated__'
import { FlatList, useLayoutStore } from '@/shared/ui'
import { useMenu } from '../MenuContext'
import {
  AlbumCollapsedView,
  AlbumCompactView,
  AlbumGridView,
  AlbumListView,
} from './AlbumItems'

type SavedAlbum = NonNullable<
  NonNullable<GetAlbumsArtistsQuery['savedAlbums']>[number]
>

const AlbumsLoading = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">Loading albums...</div>
  </div>
)

const NoAlbums = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">No albums found</div>
  </div>
)

const AlbumsContent = () => {
  const { filter, viewAs } = useMenu()
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  const { data } = useSuspenseQuery<GetAlbumsArtistsQuery>(GET_ALBUMS_ARTISTS, {
    variables: { offset: 0, limit: 20 },
  })

  if (filter !== 'ALBUM') return null

  const albums =
    data.savedAlbums?.filter(
      (item: SavedAlbum | null): item is SavedAlbum =>
        item !== null && item.album !== null,
    ) ?? []

  if (albums.length === 0) return <NoAlbums />

  const renderItem = (item: SavedAlbum) => {
    return match({ viewAs, leftPanelState })
      .with({ leftPanelState: 'COLLAPSED' }, () => (
        <AlbumCollapsedView album={item.album!} />
      ))
      .with({ viewAs: 'LIST' }, () => <AlbumListView item={item} />)
      .with({ viewAs: 'COMPACT' }, () => <AlbumCompactView item={item} />)
      .with({ viewAs: 'GRID' }, () => <AlbumGridView album={item.album!} />)
      .otherwise(() => null)
  }

  return (
    <FlatList
      data={albums}
      renderItem={renderItem}
      keyExtractor={(item) => item.album!.id}
      className="overflow-y-scroll scrollbar-hide"
    />
  )
}

const Albums = () => {
  return (
    <Suspense fallback={<AlbumsLoading />}>
      <AlbumsContent />
    </Suspense>
  )
}

export default Albums
