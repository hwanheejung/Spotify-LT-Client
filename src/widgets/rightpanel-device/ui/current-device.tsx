import { IoPhonePortraitOutline } from 'react-icons/io5'
import { MdComputer, MdOutlineSpeaker } from 'react-icons/md'
import { usePlaybackStore } from '@/features/play-track'
import type { Device } from '@/shared/graphql'
import { MusicBars, Skeleton, SkeletonText } from '@/shared/ui'

const CurrentDevice = ({ name, type }: Device) => {
  const { playerName, isPaused } = usePlaybackStore()

  return (
    <div className="rounded-md bg-gradient-to-b from-spotifyGreen/20 to-gray-900 px-3 py-4">
      <div className="flex items-center gap-3">
        {isPaused ? (
          <span className="pb-1">
            {type === 'Smartphone' && <IoPhonePortraitOutline size="1.5rem" />}
            {type === 'Computer' && <MdComputer size="1.5rem" />}
            {type === 'Speaker' && <MdOutlineSpeaker size="1.5rem" />}
          </span>
        ) : (
          <MusicBars />
        )}

        <p className="block w-[90%] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-extrabold">
          {playerName === name ? 'This web browser' : 'Current Device'}
        </p>
      </div>
      <span className="text-md">{name}</span>
    </div>
  )
}

export { CurrentDevice, CurrentDeviceSkeleton }

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
