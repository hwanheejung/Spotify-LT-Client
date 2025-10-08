import { auth } from '@/lib/utils/auth/auth'
import CurrentTrack from './CurrentTrack'
import LoginBanner from './LoginBanner'
import Player from './Player'
import SidebarNav from './SidebarNav'
import WebPlayback from './WebPlayback'

const PlayingBar = async () => {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) return <LoginBanner />
  return (
    <WebPlayback>
      <CurrentTrack />
      <Player />
      <SidebarNav />
    </WebPlayback>
  )
}

export default PlayingBar
