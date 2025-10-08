import { Skeleton, SkeletonText } from '@/components/skeleton'

const TrackItemSkeleton = () => (
  <div className="flex items-center gap-2 rounded-sm pr-5">
    <div className="px-6 py-5">
      <Skeleton className="w-4">
        <p>1</p>
      </Skeleton>
    </div>

    <div className="flex-1">
      <Skeleton className="mb-2 h-4">
        <h2>SongName</h2>
      </Skeleton>
      <Skeleton className="mb-2 h-4">
        <p className="text-sm">ArtistNameArtistName</p>
      </Skeleton>
    </div>
    <SkeletonText width="3rem" lineHeight="1rem" />
  </div>
)

const TracksSkeleton = () => (
  <div>
    <TrackItemSkeleton />
    <TrackItemSkeleton />
    <TrackItemSkeleton />
  </div>
)

export default TracksSkeleton
