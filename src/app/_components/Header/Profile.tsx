'use client'

import { useRouter } from 'next/navigation'
import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@/shared/ui'

const Profile = ({ logout }: { logout: () => Promise<void> }) => {
  const router = useRouter()

  return (
    <Menu placement="bottom-end">
      <Tooltip label="Name" placement="bottom">
        <MenuButton as="button" aria-label="Profile">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spotifyGreen/30 p-1.5">
            <div className="h-full w-full rounded-full bg-spotifyGreen" />
          </div>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem>Account</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Profile
