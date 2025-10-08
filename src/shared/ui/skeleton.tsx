'use client'

import type { Variants } from 'framer-motion'
import { type MotionProps, motion } from 'framer-motion'
import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const Skeleton = ({
  startColor = '#EDF2F7',
  endColor = '#525a64',
  speed = 2,
  className,
  style,
  children,
  ...rest
}: TSkeletonProps) => {
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

const SkeletonCircle = ({ size = '50px' }: TSkeletonCircleProps) => {
  return (
    <Skeleton
      className="rounded-full"
      style={{
        width: size,
        aspectRatio: '1 / 1',
      }}
    />
  )
}

const SkeletonText = ({
  spacing = '8px',
  lineHeight = '8px',
  lines = 1,
  width,
  className,
}: TSkeletonTextProps) => {
  const getWidth = (index: number) => {
    if (width) return width
    if (lines > 1 && lines === index + 1) return '70%'

    return width
  }

  return (
    <div className="flex flex-col" style={{ gap: spacing }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={crypto.randomUUID()}
          className={twMerge('rounded-sm', className)}
          style={{
            width: getWidth(index),
            height: lineHeight,
          }}
        />
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCircle, SkeletonText }

const createPulseVariants = (
  speed = 2,
  startColor = '#EDF2F7',
  endColor = '#A0AEC0',
): Variants => ({
  pulse: {
    background: [
      `linear-gradient(90deg, ${startColor}, ${endColor})`,
      `linear-gradient(90deg, ${endColor}, ${startColor})`,
    ],
    backgroundSize: '200% 100%',
    backgroundPosition: ['100% 50%', '0% 50%'],
    transition: {
      duration: speed,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
})

type TSkeletonProps = TSkeletonOptions &
  MotionProps & {
    className?: HTMLAttributes<HTMLDivElement>['className']
    children?: ReactNode
  }

type TSkeletonOptions = {
  startColor?: string
  endColor?: string
  speed?: number
}

type TSkeletonCircleProps = {
  size?: string
}

type TSkeletonTextProps = {
  spacing?: string
  lineHeight?: string
  lines?: number
  width?: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}
