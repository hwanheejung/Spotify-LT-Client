'use client'

import { useMutation } from '@apollo/client/react'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { MdComputer, MdOutlineSpeaker } from 'react-icons/md'
import { match, P } from 'ts-pattern'
import { TRANSFER_PLAYBACK } from '@/features/play-track'
import type { GetAvailableDevicesQuery } from '@/shared/__graphql-generated__/dto'
import OtherDevicesSkeleton from './OtherDevices.skeleton'

type Device = NonNullable<
  NonNullable<GetAvailableDevicesQuery['availableDevices']>[number]
>

const OtherDevices = ({
  data,
  refetch,
}: {
  data: Device[]
  refetch: () => void
}) => {
  const [playbackTransfer, { loading }] = useMutation(TRANSFER_PLAYBACK)

  const handleDeviceClick = async (deviceId: string) => {
    return match(deviceId)
      .with(P.string, async (id) => {
        try {
          await playbackTransfer({
            variables: { deviceId: id },
          })
          console.log(`Playback transferred to device ID: ${id}`)
          await refetch()
        } catch (err) {
          console.error(`Failed to transfer playback to device ID: ${id}`, err)
        }
      })
      .otherwise(() => {
        console.warn('Invalid device ID')
      })
  }

  const renderDeviceIcon = (deviceType: string | null | undefined) => {
    return match(deviceType)
      .with('Smartphone', () => <IoPhonePortraitOutline size="1rem" />)
      .with('Computer', () => <MdComputer size="1rem" />)
      .with('Speaker', () => <MdOutlineSpeaker size="1rem" />)
      .otherwise(() => <MdComputer size="1rem" />)
  }

  if (loading) return <OtherDevicesSkeleton />

  return match(data)
    .with(
      P.when((devices) => Array.isArray(devices) && devices.length > 0),
      (devices) => (
        <div className="px-3 py-5">
          <h3 className="pb-2 font-bold">Select another device</h3>
          {devices.map((device) =>
            match(device)
              .with(
                {
                  id: P.string,
                  name: P.string,
                },
                (device) => (
                  <button
                    key={device.id}
                    className="flex items-center gap-2 py-3"
                    onClick={() => handleDeviceClick(device.id!)}
                  >
                    <span className="pb-1">
                      {renderDeviceIcon(device.type)}
                    </span>
                    <div>{device.name}</div>
                  </button>
                ),
              )
              .otherwise(() => null),
          )}
        </div>
      ),
    )
    .otherwise(() => (
      <div className="px-3 py-5 text-gray-200">No other devices available</div>
    ))
}

export default OtherDevices
