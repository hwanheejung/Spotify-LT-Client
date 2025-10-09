'use client'

import { create } from 'zustand'

const usePremiumStore = create<TStore>((set) => ({
  isPremiumRequired: false,
  setPremiumRequired: (required) => set({ isPremiumRequired: required }),
}))

export { usePremiumStore }

type TStore = {
  isPremiumRequired: boolean
  setPremiumRequired: (required: boolean) => void
}
