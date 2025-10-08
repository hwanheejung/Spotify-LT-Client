'use client'

import { usePlaybackStore } from '@/lib/stores/playback.store'

const SetPlayerName = () => {
  const { player, playerName } = usePlaybackStore()
  return (
    <div>
      <button
        disabled={!player}
        onClick={() => {
          if (!player) return
          player.setName(playerName).then(() => {
            console.log('Player name updated!')
          })
        }}
      >
        Set Player Name
      </button>
    </div>
  )
}

export default SetPlayerName
