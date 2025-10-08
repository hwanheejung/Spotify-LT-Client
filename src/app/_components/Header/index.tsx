import { logout } from '@/lib/api/auth'
import Home from './Home'
import Logo from './Logo'
import Profile from './Profile'
import Search from './Search'

const Header = async () => {
  const signout = async () => {
    'use server'

    await logout()
  }

  return (
    <div className="flex w-full items-center justify-between px-5 py-3">
      <Logo />
      <div className="flex gap-2">
        <Home />
        <Search />
      </div>
      <Profile logout={signout} />
    </div>
  )
}

export default Header
