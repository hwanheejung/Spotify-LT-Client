import { gql } from '@apollo/client'

export const GET_AVAILABLE_DEVICES = gql`
  query {
    availableDevices {
      id
      name
      type
      is_active
      volume_percent
    }
  }
`
