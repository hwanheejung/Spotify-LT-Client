'use client'

import type { MotionStyle } from 'framer-motion'
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { MenuOptions } from './types'
import useMenuPosition from './use-position'

interface MenuContextProps {
  isOpen: boolean
  toggleMenu: Dispatch<SetStateAction<boolean>>
  closeMenu: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLElement>
  menuRef: RefObject<HTMLDivElement>
  styles: MotionStyle
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined)

interface MenuProviderProps extends Required<MenuOptions> {
  children: ReactNode
}
export const MenuProvider = ({
  children,
  placement,
  spacing,
}: MenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [styles, setStyles] = useState<MotionStyle>({})
  const triggerRef = useRef<HTMLElement | null>(null)

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  const { styles: _styles, popperRef: menuRef } = useMenuPosition({
    triggerRef,
    placement,
    spacing,
    isOpen,
  })

  useEffect(() => {
    setStyles(_styles)
  }, [_styles])

  const value = useMemo(
    () => ({
      isOpen,
      toggleMenu,
      closeMenu,
      triggerRef,
      menuRef,
      styles,
    }),
    [isOpen, menuRef, styles, toggleMenu, closeMenu],
  )
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) throw new Error('Error at useMenu')

  return context
}
