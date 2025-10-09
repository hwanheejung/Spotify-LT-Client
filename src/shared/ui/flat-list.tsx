import { CSSProperties, ReactNode, Ref } from 'react'

const FlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  className,
  style,
  ref,
}: FlatListProps<T>) => {
  return (
    <div ref={ref} className={className} style={style}>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)}>{renderItem(item, index)}</div>
      ))}
    </div>
  )
}

export { FlatList, type FlatListProps }
FlatList.displayName = 'FlatList'

type FlatListProps<T> = {
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T, index: number) => string | number
  className?: string
  style?: CSSProperties
  ref?: Ref<HTMLDivElement>
}
