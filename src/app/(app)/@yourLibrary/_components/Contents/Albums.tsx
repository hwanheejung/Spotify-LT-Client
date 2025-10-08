'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { FlatList } from '@/components/flatlist'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import type { AlbumItemDTO } from '@/shared/api'
import { useLayoutStore } from '@/shared/ui'
import { useMenu } from '../MenuContext'
import {
  AlbumCollapsedView,
  AlbumCompactView,
  AlbumGridView,
  AlbumListView,
} from './AlbumItems'

const Albums = () => {
  const { filter, viewAs } = useMenu()
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)
  const { data } = useSuspenseQuery<{ savedAlbums: AlbumItemDTO[] }>(
    GET_ALBUMS_ARTISTS,
    {
      variables: { offset: 0, limit: 20 },
    },
  )
  if (filter !== 'ALBUM') return null

  const renderItem = (item: AlbumItemDTO) => {
    if (leftPanelState === 'COLLAPSED')
      return <AlbumCollapsedView album={item.album} />

    switch (viewAs) {
      case 'LIST':
        return <AlbumListView item={item} />
      case 'COMPACT':
        return <AlbumCompactView item={item} />
      case 'GRID':
        return <AlbumGridView album={item.album} />
      default:
        return null
    }
  }

  return (
    <FlatList
      data={data.savedAlbums}
      renderItem={renderItem}
      keyExtractor={(item) => item.album.id}
      className="overflow-y-scroll scrollbar-hide"
    />
  )
}

export default Albums
