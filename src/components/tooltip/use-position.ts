import type { MotionStyle } from 'framer-motion'
import {
  type CSSProperties,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { Placement, TooltipOptions } from './types'

interface UseTooltipPositionProps
  extends Required<Omit<TooltipOptions, 'label'>> {
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
}

const useTooltipPosition = (props: UseTooltipPositionProps) => {
  const { placement, spacing, triggerRef, isOpen } = props

  const popperRef = useRef<HTMLDivElement | null>(null)
  const [styles, setStyles] = useState<MotionStyle>({})

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const popper = popperRef.current

    if (!trigger || !popper) return

    const triggerRect = trigger.getBoundingClientRect()
    const popperRect = popper.getBoundingClientRect()

    const offsets: Record<Placement, CSSProperties> = {
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

export default useTooltipPosition
