import { Suspense } from 'react'
import { PreloadQuery } from '@/shared/graphql/apollo-client'
import { GET_ALBUM } from '../model/queries'
import { AlbumOverview, AlbumOverviewSkeleton } from './album-overview'
import { Tracks, TracksSkeleton } from './album-tracks'

const AlbumDetails = ({ albumId }: TProps) => {
  return (
    <PreloadQuery query={GET_ALBUM} variables={{ albumId }}>
      <Suspense fallback={<AlbumOverviewSkeleton />}>
        <AlbumOverview albumId={albumId} />
      </Suspense>
      <Suspense fallback={<TracksSkeleton />}>
        <Tracks albumId={albumId} />
      </Suspense>
    </PreloadQuery>
  )
}

export { AlbumDetails }

type TProps = {
  albumId: string
}
