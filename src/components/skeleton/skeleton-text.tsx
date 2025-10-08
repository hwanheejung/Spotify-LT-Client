import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Skeleton from './skeleton'

interface SkeletonTextProps {
  spacing?: string
  lineHeight?: string
  lines?: number
  width?: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}

const SkeletonText = (props: SkeletonTextProps) => {
  const {
    spacing = '8px',
    lineHeight = '8px',
    lines = 1,
    width,
    className = '',
  } = props

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

export default SkeletonText
