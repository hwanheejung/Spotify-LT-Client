import { gql } from '@/shared/graphql'

export const GET_AVAILABLE_DEVICES = gql(`
  query GetAvailableDevices {
    availableDevices {
      id
      name
      type
      is_active
      volume_percent
    }
  }
`)
