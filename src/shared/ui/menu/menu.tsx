'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { MenuProvider } from './context'
import type { MenuOptions } from './types'

interface MenuProps extends MenuOptions {
  children: ReactNode
  className?: HTMLAttributes<HTMLDivElement>['className']
}

const Menu = ({
  placement = 'bottom-start',
  spacing = 6,
  className = '',
  children,
}: MenuProps) => {
  return (
    <MenuProvider placement={placement} spacing={spacing}>
      <div className={twMerge('relative', className)}>{children}</div>
    </MenuProvider>
  )
}

Menu.displayName = 'Menu'

export default Menu
