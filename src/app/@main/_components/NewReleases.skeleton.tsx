'use client'

import { GridList } from '@/components/flatlist'
import { Section } from '@/components/section'
import { Skeleton, SkeletonText } from '@/components/skeleton'

const NewReleasesSkeleton = () => (
  <Section title="New Releases" hasLink={false}>
    <GridList
      data={Array.from({ length: 5 }).fill(0)}
      itemMinWidth={150}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <div className="flex flex-col p-2">
          <Skeleton className="mb-2 aspect-square w-full rounded-sm" />
          <SkeletonText lines={2} />
        </div>
      )}
    />
  </Section>
)

export default NewReleasesSkeleton
