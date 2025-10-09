'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FlatList, type FlatListProps } from './flat-list'

interface GridListProps<T> extends FlatListProps<T> {
  maxNum?: number
  wrap?: boolean
  itemMinWidth?: number
}
const GridList = <T,>(props: GridListProps<T>) => {
  const {
    maxNum = 6,
    wrap = false,
    itemMinWidth = 200,
    data,
    className,
    ...rest
  } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visibleData, setVisibleData] = useState(data.slice(0, maxNum))

  useEffect(() => {
    if (wrap) return () => {}

    const observer = new ResizeObserver((entries) => {
      const containerWidth = entries[0].contentRect.width
      const itemsPerRow = Math.floor(containerWidth / itemMinWidth)
      const maxVisibleItems = Math.min(itemsPerRow, maxNum)

      setVisibleData(data.slice(0, maxVisibleItems))
    })

    const currentContainer = containerRef.current
    if (currentContainer) observer.observe(currentContainer)

    return () => {
      if (currentContainer) observer.unobserve(currentContainer)
    }
  }, [wrap, itemMinWidth, maxNum, data])

  return (
    <FlatList
      ref={containerRef}
      data={visibleData}
      className={twMerge('grid gap-2', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${itemMinWidth}px, 1fr))`,
      }}
      {...rest}
    />
  )
}

export default GridList
