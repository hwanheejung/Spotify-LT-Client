import { Skeleton, SkeletonText } from '@/components/skeleton'

const TrackSkeleton = () => (
  <div className="flex items-center gap-3 py-3">
    <Skeleton className="h-10 w-10 rounded-sm" />

    <div className="flex-1">
      <SkeletonText lines={2} />
    </div>
  </div>
)

export default TrackSkeleton
