import type { ReactNode } from 'react'

const FlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  className,
}: TProps<T>) => {
  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}

export { FlatList }

type TProps<T> = {
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T, index: number) => string | number
  className?: string
}
