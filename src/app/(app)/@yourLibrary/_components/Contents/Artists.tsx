'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { Suspense } from 'react'
import { match } from 'ts-pattern'
import { GET_ALBUMS_ARTISTS } from '@/lib/queries/albums.query'
import type { GetAlbumsArtistsQuery } from '@/shared/graphql'
import { FlatList, useLayoutStore } from '@/shared/ui'
import { useMenu } from '../MenuContext'
import {
  ArtistCollapsedView,
  ArtistCompactView,
  ArtistGridView,
  ArtistListView,
} from './ArtistItems'

type SavedArtist = NonNullable<
  NonNullable<GetAlbumsArtistsQuery['savedArtists']>[number]
>

const ArtistsLoading = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">Loading artists...</div>
  </div>
)

const NoArtists = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">No artists found</div>
  </div>
)

const ArtistsContent = () => {
  const { filter, viewAs } = useMenu()
  const leftPanelState = useLayoutStore((state) => state.leftPanelState)

  const { data } = useSuspenseQuery<GetAlbumsArtistsQuery>(GET_ALBUMS_ARTISTS)

  if (filter !== 'ARTIST') return null

  const artists =
    data.savedArtists?.filter((item): item is SavedArtist => item !== null) ??
    []

  if (artists.length === 0) return <NoArtists />

  const renderItem = (artist: SavedArtist) => {
    return match({ viewAs, leftPanelState })
      .with({ leftPanelState: 'COLLAPSED' }, () => (
        <ArtistCollapsedView artist={artist} />
      ))
      .with({ viewAs: 'LIST' }, () => <ArtistListView artist={artist} />)
      .with({ viewAs: 'COMPACT' }, () => <ArtistCompactView artist={artist} />)
      .with({ viewAs: 'GRID' }, () => <ArtistGridView artist={artist} />)
      .otherwise(() => null)
  }

  return (
    <FlatList
      data={artists}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      className="overflow-y-scroll scrollbar-hide"
    />
  )
}

const Artists = () => {
  return (
    <Suspense fallback={<ArtistsLoading />}>
      <ArtistsContent />
    </Suspense>
  )
}

export default Artists
