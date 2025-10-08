'use client'

import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'
import TooltipPopper from './tooltip-popper'
import type { TooltipOptions } from './types'

export interface TooltipProps extends TooltipOptions {
  children: ReactNode
  className?: HTMLAttributes<HTMLSpanElement>['className']
}

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    label,
    placement = 'top',
    spacing = 6,
    className = '',
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openTooltip = useCallback(() => setIsOpen(true), [])
  const closeTooltip = useCallback(() => setIsOpen(false), [])

  if (!label) return children

  return (
    <div className="relative w-fit">
      <button
        ref={triggerRef}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        onFocus={openTooltip}
        onBlur={closeTooltip}
        onClick={(event) => {
          event.stopPropagation()
          closeTooltip()
        }}
        className={`inline-block ${className}`}
        type="button"
        aria-label={label}
      >
        {children}
      </button>

      <TooltipPopper
        isOpen={isOpen}
        label={label}
        placement={placement}
        spacing={spacing}
        triggerRef={triggerRef}
      />
    </div>
  )
}

export default Tooltip
