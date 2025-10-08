'use client'

import { MotionStyle, motion, Variants } from 'framer-motion'
import {
  CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import { cn } from '../lib/utils'

const Tooltip = ({
  children,
  label,
  placement = 'top',
  spacing = 6,
  className,
}: TTooltipProps) => {
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
        className={cn(`inline-block ${className}`)}
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

const TooltipPopper = (props: TTooltipPopperProps) => {
  const { placement, spacing, triggerRef, label, isOpen } = props

  const { styles, popperRef } = useTooltipPosition({
    placement,
    spacing,
    triggerRef,
    isOpen,
  })

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <motion.div
      ref={popperRef}
      className="absolute rounded bg-gray-400 px-2 py-1 text-xs text-gray-0"
      variants={tooltipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ ...styles }}
    >
      {label}
    </motion.div>,
    document.body,
  )
}

export { Tooltip, type TPlacement, type TTooltipOptions }

const useTooltipPosition = ({
  placement,
  spacing,
  triggerRef,
  isOpen,
}: TUseTooltipPositionParams) => {
  const popperRef = useRef<HTMLDivElement | null>(null)
  const [styles, setStyles] = useState<MotionStyle>({})

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const popper = popperRef.current

    if (!trigger || !popper) return

    const triggerRect = trigger.getBoundingClientRect()
    const popperRect = popper.getBoundingClientRect()

    const offsets: Record<TPlacement, CSSProperties> = {
      'top-start': {
        top: triggerRect.top - popperRect.height - spacing,
        left: triggerRect.left,
      },
      top: {
        top: triggerRect.top - popperRect.height - spacing,
        left: triggerRect.left + triggerRect.width / 2 - popperRect.width / 2,
      },
      'top-end': {
        top: triggerRect.top - popperRect.height - spacing,
        left: triggerRect.right - popperRect.width,
      },
      'bottom-start': {
        top: triggerRect.bottom + spacing,
        left: triggerRect.left,
      },
      bottom: {
        top: triggerRect.bottom + spacing,
        left: triggerRect.left + triggerRect.width / 2 - popperRect.width / 2,
      },
      'bottom-end': {
        top: triggerRect.bottom + spacing,
        left: triggerRect.right - popperRect.width,
      },
      'left-start': {
        top: triggerRect.top,
        left: triggerRect.left - popperRect.width - spacing,
      },
      left: {
        top: triggerRect.top + triggerRect.height / 2 - popperRect.height / 2,
        left: triggerRect.left - popperRect.width - spacing,
      },
      'left-end': {
        top: triggerRect.bottom - popperRect.height,
        left: triggerRect.left - popperRect.width - spacing,
      },
      'right-start': {
        top: triggerRect.top,
        left: triggerRect.right + spacing,
      },
      right: {
        top: triggerRect.top + triggerRect.height / 2 - popperRect.height / 2,
        left: triggerRect.right + spacing,
      },
      'right-end': {
        top: triggerRect.bottom - popperRect.height,
        left: triggerRect.right + spacing,
      },
    }

    setStyles(offsets[placement])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, spacing, triggerRef])

  useLayoutEffect(() => {
    calculatePosition()

    const handleResize = () => calculatePosition()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [calculatePosition])

  return { styles, popperRef, calculatePosition }
}

const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
}

type TTooltipProps = TTooltipOptions & {
  children: ReactNode
  className?: HTMLAttributes<HTMLSpanElement>['className']
}

type TTooltipPopperProps = Required<TTooltipOptions> & {
  isOpen: boolean
  triggerRef: React.RefObject<HTMLElement | null>
}

type TPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'

type TTooltipOptions = {
  label: string
  placement?: TPlacement
  spacing?: number
}

type TUseTooltipPositionParams = Required<Omit<TTooltipOptions, 'label'>> & {
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
}
