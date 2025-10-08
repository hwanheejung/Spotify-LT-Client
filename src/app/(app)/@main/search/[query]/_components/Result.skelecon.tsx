import { Section } from '@/components/section'
import { Skeleton, SkeletonCircle, SkeletonText } from '@/components/skeleton'

const ResultSkeleton = () => (
  <div>
    <div className="grid grid-cols-2 gap-3">
      <Section title="Top result" hasLink={false}>
        <div className="h-full rounded-md bg-gray-600 p-4 pb-7">
          <div>
            <SkeletonCircle size="120px" />
            <SkeletonText width="80%" lines={2} className="mt-3" />
          </div>
        </div>
      </Section>
      <Section hasLink title="Songs" href="/" showShowAllText={false}>
        <div className="flex items-center gap-3 p-2">
          <SkeletonCircle size="50px" />
          <div className="flex-1 overflow-hidden">
            <SkeletonText width="60%" className="mb-3" />
            <SkeletonText width="30%" />
          </div>
          <Skeleton>
            <p className="text-xs">00:00</p>
          </Skeleton>
        </div>
        <div className="flex items-center gap-3 p-2">
          <SkeletonCircle size="50px" />
          <div className="flex-1 overflow-hidden">
            <SkeletonText width="60%" className="mb-3" />
            <SkeletonText width="30%" />
          </div>
          <Skeleton>
            <p className="text-xs">00:00</p>
          </Skeleton>
        </div>
        <div className="flex items-center gap-3 p-2">
          <SkeletonCircle size="50px" />
          <div className="flex-1 overflow-hidden">
            <SkeletonText width="60%" className="mb-3" />
            <SkeletonText width="30%" />
          </div>
          <Skeleton>
            <p className="text-xs">00:00</p>
          </Skeleton>
        </div>
      </Section>
    </div>
    <Section title="Artists" hasLink href="/">
      <div className="grid grid-cols-4">
        <div className="rounded-md p-3">
          <SkeletonCircle size="100%" />
          <SkeletonText className="mt-4" lines={2} />
        </div>
        <div className="rounded-md p-3">
          <SkeletonCircle size="100%" />
          <SkeletonText className="mt-4" lines={2} />
        </div>
        <div className="rounded-md p-3">
          <SkeletonCircle size="100%" />
          <SkeletonText className="mt-4" lines={2} />
        </div>
        <div className="rounded-md p-3">
          <SkeletonCircle size="100%" />
          <SkeletonText className="mt-4" lines={2} />
        </div>
      </div>
    </Section>
  </div>
)

export default ResultSkeleton
