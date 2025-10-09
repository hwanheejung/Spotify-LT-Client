'use client'

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

export type TFilterType = 'ALBUM' | 'ARTIST'
export type TViewAs = 'COMPACT' | 'LIST' | 'GRID'

interface ContextProps {
  filter: TFilterType
  viewAs: TViewAs
  setFilter: Dispatch<SetStateAction<TFilterType>>
  setViewAs: Dispatch<SetStateAction<TViewAs>>
}

const MenuContext = createContext<ContextProps | undefined>(undefined)

interface MenuProviderProps {
  children: ReactNode
  defaultFilter: TFilterType
  defaultViewAs: TViewAs
}

export const MenuProvider = ({
  children,
  defaultFilter,
  defaultViewAs,
}: MenuProviderProps) => {
  const [filter, setFilter] = useState<TFilterType>(defaultFilter)
  const [viewAs, setViewAs] = useState<TViewAs>(defaultViewAs)

  const value = useMemo(
    () => ({
      filter,
      viewAs,
      setFilter,
      setViewAs,
    }),
    [filter, viewAs],
  )

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) throw new Error('Error at useFilter')

  return context
}
