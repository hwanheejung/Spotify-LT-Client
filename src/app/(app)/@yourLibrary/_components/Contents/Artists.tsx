'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { FlatList } from '@/components/flatlist'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import { useLayoutStore } from '@/lib/stores/layout.store'
import type { ArtistDTO } from '@/types/artists.types'
import { useMenu } from '../MenuContext'
import {
  ArtistCollapsedView,
  ArtistCompactView,
  ArtistGridView,
  ArtistListView,
} from './ArtistItems'

const Artists = () => {
  const { filter, viewAs } = useMenu()
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)
  const { data } = useSuspenseQuery<{ savedArtists: ArtistDTO[] }>(
    GET_ALBUMS_ARTISTS,
  )

  if (filter !== 'ARTIST') return null

  const renderItem = (artist: ArtistDTO) => {
    if (leftPanelState === 'COLLAPSED')
      return <ArtistCollapsedView artist={artist} />

    switch (viewAs) {
      case 'LIST':
        return <ArtistListView artist={artist} />
      case 'COMPACT':
        return <ArtistCompactView artist={artist} />
      case 'GRID':
        return <ArtistGridView artist={artist} />
      default:
        return null
    }
  }

  return (
    <FlatList
      data={data.savedArtists}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      className="overflow-y-scroll scrollbar-hide"
    />
  )
}

export default Artists
