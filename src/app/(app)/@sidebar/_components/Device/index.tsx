import { useQuery } from '@apollo/client/react'
import { GET_AVAILABLE_DEVICES } from '@/lib/queries/player.query'
import type { DeviceDTO } from '@/types/player.types'
import Header from '../Header'
import CurrentDevice from './CurrentDevice'
import CurrentDeviceSkeleton from './CurrentDevice.skeleton'
import OtherDevices from './OtherDevices'
import OtherDevicesSkeleton from './OtherDevices.skeleton'

const Device = () => {
  const { loading, error, data, refetch } = useQuery(GET_AVAILABLE_DEVICES)
  if (loading)
    return (
      <div>
        <CurrentDeviceSkeleton />
        <OtherDevicesSkeleton />
      </div>
    )
  if (error) return `Error! ${error.message}`

  const devices = data.availableDevices
  const currentDevice = devices.find((device: DeviceDTO) => device.is_active)
  const otherDevices = devices.filter(
    (device: DeviceDTO) => device.is_active !== true,
  )

  return (
    <div>
      <Header title="Connect to a device" />

      <CurrentDevice {...currentDevice} />
      <OtherDevices data={Object.values(otherDevices)} refetch={refetch} />
    </div>
  )
}
export default Device
