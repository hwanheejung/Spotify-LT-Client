'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { match, P } from 'ts-pattern'
import { FlatList } from '@/components/flatlist'
import { AlbumTrack, AlbumTrackSkeleton } from '@/entities/track'
import { GET_ALBUM } from '@/lib/queries/albums.query'
import type {
  GetAlbumQuery,
  AlbumTrack as TAlbumTrack,
} from '@/shared/__graphql-generated__'

const Tracks = ({ albumId }: { albumId: string }) => {
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
          (track): track is TAlbumTrack => track !== null,
        )

        return (
          <FlatList
            data={validTracks}
            renderItem={(item) => <AlbumTrack track={item} albumId={albumId} />}
            keyExtractor={(item) => item.id!}
          />
        )
      },
    )
    .otherwise(() => <NoTracks />)
}

export { Tracks, TracksSkeleton }

const TracksSkeleton = () => (
  <div>
    <AlbumTrackSkeleton />
    <AlbumTrackSkeleton />
    <AlbumTrackSkeleton />
  </div>
)

const NoTracks = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">No tracks found</div>
  </div>
)
