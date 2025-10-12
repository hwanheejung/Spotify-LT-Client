'use client'

import { logoutAction } from '@/features/login'
import {
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@/shared/ui'

const Profile = () => {
  const handleLogout = async () => {
    await logoutAction()
  }

  return (
    <Menu placement="bottom-end">
      <Tooltip label="Name" placement="bottom">
        <MenuButton as="button" aria-label="Profile">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green/30 p-1.5">
            <div className="h-full w-full rounded-full bg-spotifyGreen" />
          </div>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem>Account</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export { Profile }
