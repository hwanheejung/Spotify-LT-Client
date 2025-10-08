import type { ReactNode } from 'react'

interface FlatListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T, index: number) => string | number
  className?: string
}

const FlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  className,
}: FlatListProps<T>) => {
  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}

export default FlatList
