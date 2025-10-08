import Link from 'next/link'
import { FaSpotify } from 'react-icons/fa'
import { GrHomeRounded } from 'react-icons/gr'
import { SearchBar } from '@/features/search'
import { logout } from '@/lib/api/auth'
import Profile from './Profile'

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
        <SearchBar />
      </div>
      <Profile logout={signout} />
    </div>
  )
}

export default Header

const Home = () => (
  <Link
    href="/"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-gray-200"
    aria-label="Home"
  >
    <GrHomeRounded size="1.3rem" />
  </Link>
)

const Logo = () => (
  <Link href="/" aria-label="Spotify logo, go to home">
    <FaSpotify size="2rem" />
  </Link>
)
