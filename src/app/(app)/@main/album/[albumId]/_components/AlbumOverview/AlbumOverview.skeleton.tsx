import { Skeleton, SkeletonText } from '@/components/skeleton'

const AlbumOverviewSkeleton = () => (
  <div className="px-5 pb-7 pt-10">
    <div className="flex items-end gap-5">
      <Skeleton className="h-[150px] w-[150px] rounded-sm" />

      <div className="flex flex-1 flex-col gap-2">
        <SkeletonText width="20%" className="mb-3" />
        <SkeletonText lineHeight="36px" className="mb-3" />
        <SkeletonText width="70%" />
      </div>
    </div>
  </div>
)
export default AlbumOverviewSkeleton
