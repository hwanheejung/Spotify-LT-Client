import { IoPhonePortraitOutline } from 'react-icons/io5'
import { Skeleton, SkeletonText } from '@/shared/ui'

const DeviceItem = () => (
  <div className="flex items-center gap-2 py-3">
    <Skeleton>
      <span className="pb-1">
        <IoPhonePortraitOutline size="1rem" />
      </span>
    </Skeleton>
    <SkeletonText lines={1} width="10rem" />
  </div>
)

const OtherDevicesSkeleton = () => (
  <div className="px-3 py-5">
    <h3 className="pb-2 font-bold">Select another device</h3>
    <DeviceItem />
    <DeviceItem />
    <DeviceItem />
  </div>
)

export default OtherDevicesSkeleton
