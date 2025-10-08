import { IoPhonePortraitOutline } from 'react-icons/io5'
import { Skeleton, SkeletonText } from '@/shared/ui'

const CurrentDeviceSkeleton = () => (
  <div className="rounded-md bg-gradient-to-b from-spotifyGreen/20 to-gray-900 px-3 py-4 pr-16">
    <div className="flex items-center gap-3">
      <Skeleton>
        <span className="pb-1">
          <IoPhonePortraitOutline size="1.5rem" />
        </span>
      </Skeleton>
      <SkeletonText width="7rem" lineHeight="1.5rem" />
    </div>
    <SkeletonText width="5rem" className="mt-3" />
  </div>
)

export default CurrentDeviceSkeleton
