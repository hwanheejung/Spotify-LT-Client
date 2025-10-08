import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { tooltipVariants } from './transition'
import type { TooltipOptions } from './types'
import useTooltipPosition from './use-position'

export interface TooltipPopperProps extends Required<TooltipOptions> {
  isOpen: boolean
  triggerRef: React.RefObject<HTMLElement | null>
}

const TooltipPopper = (props: TooltipPopperProps) => {
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

export default TooltipPopper
