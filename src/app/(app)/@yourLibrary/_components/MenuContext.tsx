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

export type IFilterType = 'ALBUM' | 'ARTIST'
export type IViewAs = 'COMPACT' | 'LIST' | 'GRID'

interface ContextProps {
  filter: IFilterType
  viewAs: IViewAs
  setFilter: Dispatch<SetStateAction<IFilterType>>
  setViewAs: Dispatch<SetStateAction<IViewAs>>
}

const MenuContext = createContext<ContextProps | undefined>(undefined)

interface MenuProviderProps {
  children: ReactNode
  defaultFilter: IFilterType
  defaultViewAs: IViewAs
}

export const MenuProvider = ({
  children,
  defaultFilter,
  defaultViewAs,
}: MenuProviderProps) => {
  const [filter, setFilter] = useState<IFilterType>(defaultFilter)
  const [viewAs, setViewAs] = useState<IViewAs>(defaultViewAs)

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
