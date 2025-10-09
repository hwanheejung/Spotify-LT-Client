'use client'

import Image from 'next/image'
import { usePlaybackStore } from '@/features/play-track'
import { Skeleton, SkeletonText } from '@/shared/ui'

const CurrentTrack = () => {
  const { currentTrack } = usePlaybackStore()

  if (!currentTrack)
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div className="w-36">
          <SkeletonText lines={2} />
        </div>
      </div>
    )

  return (
    <div className="flex items-center gap-3">
      <Image
        src={currentTrack.album.images[0].url}
        width={50}
        height={50}
        alt={currentTrack.name}
      />
      <div>
        <p className="text-xs">{currentTrack.name}</p>
        <p className="text-xxs text-gray-200">{currentTrack.artists[0].name}</p>
      </div>
    </div>
  )
}

export { CurrentTrack }
