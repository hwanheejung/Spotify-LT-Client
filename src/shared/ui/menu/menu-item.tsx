import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import MenuIcon from './menu-icon'

interface ItemProps extends HTMLAttributes<HTMLButtonElement> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
}

const MenuItem = (props: ItemProps) => {
  const {
    children,
    iconLeft,
    iconRight,
    disabled = false,
    className,
    ...rest
  } = props

  const shouldWrap = iconLeft || iconRight
  const _children = shouldWrap ? (
    <span className="pointer-events-none flex-1 text-start">{children}</span>
  ) : (
    children
  )

  return (
    <button
      className={twMerge(
        'flex w-full items-center gap-3 rounded-sm bg-transparent p-3 text-xs hover:bg-gray-300',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <MenuIcon>{iconLeft}</MenuIcon>}
      {_children}
      {iconRight && <MenuIcon>{iconRight}</MenuIcon>}
    </button>
  )
}

export default MenuItem
