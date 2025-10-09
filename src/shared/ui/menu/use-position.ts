import type { MotionStyle } from 'framer-motion'
import {
  type CSSProperties,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { MenuOptions, Placement } from './types'

interface useMenuPositionProps extends Required<MenuOptions> {
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
}

const useMenuPosition = (props: useMenuPositionProps) => {
  const { triggerRef, spacing, placement, isOpen } = props

  const popperRef = useRef<HTMLDivElement | null>(null)
  const [styles, setStyles] = useState<MotionStyle>({})

  const calculatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const popper = popperRef.current

    if (!trigger || !popper) return

    const triggerRect = trigger.getBoundingClientRect()
    const popperRect = popper.getBoundingClientRect()

    const offsets: Record<Placement, CSSProperties> = {
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
    }

    setStyles(offsets[placement])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, triggerRef, spacing])

  useLayoutEffect(() => {
    calculatePosition()

    const handleResize = () => calculatePosition()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [calculatePosition])

  return { styles, popperRef }
}

export default useMenuPosition
