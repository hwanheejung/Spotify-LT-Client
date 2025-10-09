import { create } from 'zustand'

type Track = {
  id: string | null
  name: string
  is_playable: boolean
  album: {
    name: string
    images: { url: string }[]
  }
  artists: { name: string }[]
  duration: number
  position: number
}

const usePlaybackStore = create<TStore>((set) => ({
  player: undefined,
  playerName: 'Spotify Player',
  currentTrack: undefined,
  isPaused: true,
  isActive: false,
  deviceId: null,
  setPlayer: (player) => set({ player }),
  setPlayerName: (playerName) => set({ playerName }),
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setIsActive: (isActive) => set({ isActive }),
  setDeviceId: (deviceId) => set({ deviceId }),
}))

export { usePlaybackStore }

type TStore = {
  player?: Spotify.Player
  playerName: string
  currentTrack?: Track
  isPaused: boolean
  isActive: boolean
  deviceId: string | null
  setPlayer: (player: Spotify.Player) => void
  setPlayerName: (playerName: string) => void
  setCurrentTrack: (currentTrack: Track) => void
  setIsPaused: (isPaused: boolean) => void
  setIsActive: (isActive: boolean) => void
  setDeviceId: (deviceId: string | null) => void
}
