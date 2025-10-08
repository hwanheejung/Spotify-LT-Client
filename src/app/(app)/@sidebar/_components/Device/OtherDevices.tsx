import { useMutation } from '@apollo/client/react'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { MdComputer, MdOutlineSpeaker } from 'react-icons/md'
import { TRANSFER_PLAYBACK } from '@/lib/queries/player.query'
import type { DeviceDTO } from '@/types/player.types'
import OtherDevicesSkeleton from './OtherDevices.skeleton'

const OtherDevices = ({
  data,
  refetch,
}: {
  data: DeviceDTO[]
  refetch: () => void
}) => {
  const [playbackTransfer, { loading }] = useMutation(TRANSFER_PLAYBACK)

  const handleDeviceClick = async (deviceId: string) => {
    try {
      await playbackTransfer({
        variables: {
          deviceId,
        },
      })
      console.log(`Playback transferred to device ID: ${deviceId}`)
      await refetch()
    } catch (err) {
      console.error(
        `Failed to transfer playback to device ID: ${deviceId}`,
        err,
      )
    }
  }

  if (loading) return <OtherDevicesSkeleton />

  return (
    <div className="px-3 py-5">
      <h3 className="pb-2 font-bold">Select another device</h3>
      {data.map((device: DeviceDTO) => (
        <button
          key={device.id}
          className="flex items-center gap-2 py-3"
          onClick={() => handleDeviceClick(device.id)}
        >
          <span className="pb-1">
            {device.type === 'Smartphone' && (
              <IoPhonePortraitOutline size="1rem" />
            )}
            {device.type === 'Computer' && <MdComputer size="1rem" />}
            {device.type === 'Speaker' && <MdOutlineSpeaker size="1rem" />}
          </span>
          <div>{device.name}</div>
        </button>
      ))}
    </div>
  )
}

export default OtherDevices
