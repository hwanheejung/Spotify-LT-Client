'use client'

import { useQuery } from '@apollo/client/react'
import { match, P } from 'ts-pattern'
import { GET_AVAILABLE_DEVICES } from '@/entities/devices'
import type { GetAvailableDevicesQuery } from '@/shared/graphql'
import { CurrentDevice, CurrentDeviceSkeleton } from './current-device'
import { OtherDevices, OtherDevicesSkeleton } from './other-devices'

type Device = NonNullable<
  NonNullable<GetAvailableDevicesQuery['availableDevices']>[number]
>

const DevicePanel = () => {
  const { loading, error, data, refetch } = useQuery<GetAvailableDevicesQuery>(
    GET_AVAILABLE_DEVICES,
  )

  return match({ loading, error, data })
    .with({ loading: true }, () => (
      <div>
        <CurrentDeviceSkeleton />
        <OtherDevicesSkeleton />
      </div>
    ))
    .with({ error: P.not(P.nullish) }, ({ error }) => (
      <div>Error! {error.message}</div>
    ))
    .with(
      {
        data: {
          availableDevices: P.when(
            (devices) => Array.isArray(devices) && devices.length > 0,
          ),
        },
      },
      ({ data }) => {
        const devices = data.availableDevices!.filter(
          (device): device is Device => device !== null,
        )

        const currentDevice = devices.find(
          (device) => device.is_active === true,
        )
        const otherDevices = devices.filter(
          (device) => device.is_active !== true,
        )

        return (
          <div>
            {currentDevice && <CurrentDevice {...currentDevice} />}
            <OtherDevices data={otherDevices} refetch={refetch} />
          </div>
        )
      },
    )
    .otherwise(() => (
      <div>
        <div className="p-5 text-gray-200">No devices available</div>
      </div>
    ))
}

export { DevicePanel }
