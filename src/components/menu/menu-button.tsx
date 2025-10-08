import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { useMenu } from './context'

interface MenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  as: ElementType
}

const MenuButton = (props: MenuButtonProps) => {
  const { children, as: Component = 'button', ...rest } = props
  const { toggleMenu, triggerRef, isOpen } = useMenu()

  return (
    <Component
      ref={triggerRef}
      onClick={toggleMenu}
      aria-haspopup
      aria-expanded={isOpen}
      aria-describedby={isOpen ? 'menu' : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default MenuButton
