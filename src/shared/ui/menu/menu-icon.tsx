import {
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
} from 'react'
import { twMerge } from 'tailwind-merge'

type MenuIconProps = HTMLAttributes<HTMLSpanElement>

const MenuIcon = (props: MenuIconProps) => {
  const { className, children, ...rest } = props

  const child = Children.only(children)

  const clone = isValidElement(child)
    ? cloneElement<any>(child, {
        focusable: 'false',
        'aria-hidden': true,
        className: twMerge('w-4 h-4', child.props.className),
      })
    : null

  return (
    <span className={className} {...rest}>
      {clone}
    </span>
  )
}

export default MenuIcon
