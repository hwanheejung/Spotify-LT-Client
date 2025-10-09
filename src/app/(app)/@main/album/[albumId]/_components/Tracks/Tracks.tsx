'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { Suspense } from 'react'
import { match, P } from 'ts-pattern'
import { FlatList } from '@/components/flatlist'
import { GET_ALBUM } from '@/lib/queries/albums.query'
import type {
  AlbumTrack,
  GetAlbumQuery,
} from '@/shared/__graphql-generated__/dto'
import TrackItem from './TrackItem'

const TracksLoading = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">Loading tracks...</div>
  </div>
)

const NoTracks = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">No tracks found</div>
  </div>
)

const TracksContent = ({ albumId }: { albumId: string }) => {
  const { data } = useSuspenseQuery<GetAlbumQuery>(GET_ALBUM, {
    variables: { albumId },
  })

  return match(data.album)
    .with(
      {
        tracks: P.when((tracks) => Array.isArray(tracks) && tracks.length > 0),
      },
      (album) => {
        const validTracks = album.tracks.filter(
          (track): track is AlbumTrack => track !== null,
        )

        return (
          <FlatList
            data={validTracks}
            renderItem={(item) => <TrackItem track={item} albumId={albumId} />}
            keyExtractor={(item) => item.id!}
          />
        )
      },
    )
    .otherwise(() => <NoTracks />)
}

const Tracks = ({ albumId }: { albumId: string }) => {
  return (
    <Suspense fallback={<TracksLoading />}>
      <TracksContent albumId={albumId} />
    </Suspense>
  )
}

export default Tracks
