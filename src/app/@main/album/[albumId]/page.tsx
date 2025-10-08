import { lazy, Suspense } from 'react'
import { PreloadQuery } from '@/lib/graphql/apollo-client'
import { GET_ALBUM } from '@/lib/queries/albums.query'
import AlbumNav from './_components/AlbumNav'
import { AlbumOverviewSkeleton } from './_components/AlbumOverview'
import { TracksSkeleton } from './_components/Tracks'

const Tracks = lazy(() =>
  import('./_components/Tracks').then((module) => ({ default: module.Tracks })),
)
const AlbumOverview = lazy(() =>
  import('./_components/AlbumOverview').then((module) => ({
    default: module.AlbumOverview,
  })),
)

interface AlbumPageProps {
  params: Promise<{ albumId: string }>
}

const AlbumPage = async ({ params }: AlbumPageProps) => {
  const { albumId } = await params

  return (
    <div className="h-full overflow-y-scroll scrollbar-hide">
      <PreloadQuery query={GET_ALBUM} variables={{ albumId }}>
        <Suspense fallback={<AlbumOverviewSkeleton />}>
          <AlbumOverview albumId={albumId} />
        </Suspense>
        <AlbumNav id={albumId} />
        <Suspense fallback={<TracksSkeleton />}>
          <Tracks albumId={albumId} />
        </Suspense>
      </PreloadQuery>
    </div>
  )
}

export default AlbumPage
