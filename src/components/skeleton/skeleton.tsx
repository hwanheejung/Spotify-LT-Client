'use client'

import { type MotionProps, motion } from 'framer-motion'
import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { createPulseVariants } from './transition'
import type { SkeletonOptions } from './types'

interface SkeletonProps extends SkeletonOptions, MotionProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
  children?: ReactNode
}

const Skeleton = (props: SkeletonProps) => {
  const {
    startColor = '#EDF2F7',
    endColor = '#525a64',
    speed = 2,
    className,
    style,
    children,
    ...rest
  } = props

  const pulseVariants = createPulseVariants(speed, startColor, endColor)

  if (children)
    return (
      <motion.div
        {...rest}
        className={twMerge(
          'pointer-events-none w-fit select-none rounded-md',
          className,
        )}
        style={{
          ...style,
          background: `linear-gradient(90deg, ${startColor}, ${endColor}, ${startColor})`,
          backgroundSize: '200% 100%',
        }}
        variants={pulseVariants}
        initial="initial"
        animate="pulse"
      >
        <div className="opacity-0">{children}</div>
      </motion.div>
    )

  return (
    <motion.div
      {...rest}
      className={twMerge(
        'pointer-events-none select-none rounded-md',
        className,
      )}
      style={{
        ...style,
        background: `linear-gradient(90deg, ${startColor}, ${endColor}, ${startColor})`,
        backgroundSize: '200% 100%',
      }}
      variants={pulseVariants}
      initial="initial"
      animate="pulse"
    />
  )
}

export default Skeleton

Skeleton.displayName = 'Skeleton'
