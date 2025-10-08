import CurrentTrack from './CurrentTrack'
import Player from './Player'
import SidebarNav from './SidebarNav'
import WebPlayback from './WebPlayback'

const PlayingBar = async () => {
  return (
    <WebPlayback>
      <CurrentTrack />
      <Player />
      <SidebarNav />
    </WebPlayback>
  )
}

export default PlayingBar
