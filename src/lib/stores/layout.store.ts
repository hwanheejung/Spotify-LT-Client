import type { RefObject } from 'react'
import type { ImperativePanelHandle } from 'react-resizable-panels'
import { create } from 'zustand'

interface LayoutStore {
  leftPanelRef?: RefObject<ImperativePanelHandle>
  mainPanelRef?: RefObject<ImperativePanelHandle>
  rightPanelRef?: RefObject<ImperativePanelHandle>
  setLeftPanelRef: (ref: RefObject<ImperativePanelHandle>) => void
  setMainPanelRef: (ref: RefObject<ImperativePanelHandle>) => void
  setRightPanelRef: (ref: RefObject<ImperativePanelHandle>) => void

  leftPanelState: 'COLLAPSED' | 'DEFAULT' | 'EXPANDED'
  setLeftPanelState: (state: 'COLLAPSED' | 'DEFAULT' | 'EXPANDED') => void

  rightPanelState: 'NOW_PLAYING' | 'QUEUE' | 'DEVICE' | null
  setRightPanelState: (state: 'NOW_PLAYING' | 'QUEUE' | 'DEVICE' | null) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  leftPanelRef: undefined,
  mainPanelRef: undefined,
  rightPanelRef: undefined,
  setLeftPanelRef: (ref) => set({ leftPanelRef: ref }),
  setMainPanelRef: (ref) => set({ mainPanelRef: ref }),
  setRightPanelRef: (ref) => set({ rightPanelRef: ref }),

  leftPanelState: 'DEFAULT',
  setLeftPanelState: (state) => set({ leftPanelState: state }),

  rightPanelState: 'NOW_PLAYING',
  setRightPanelState: (state) => set({ rightPanelState: state }),
}))
