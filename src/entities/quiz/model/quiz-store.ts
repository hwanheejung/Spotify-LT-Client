import { create } from 'zustand'
import type { LevelId, Status } from '@/types/quiz.types'

const useQuizStore = create<TStore>((set) => ({
  status: 'NOT_PLAYING',
  setStatus: (status) => set({ status }),

  trackId: '',
  setTrackId: (trackId) => set({ trackId }),

  level: 0,
  setLevel: (level) => set({ level }),
}))

export { useQuizStore }

type TStore = {
  status: Status
  setStatus: (status: Status) => void

  trackId: string
  setTrackId: (trackId: string) => void

  level: LevelId
  setLevel: (level: LevelId) => void
}
