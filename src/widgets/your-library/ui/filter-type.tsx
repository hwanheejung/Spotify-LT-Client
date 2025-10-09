'use client'

import { twMerge } from 'tailwind-merge'
import { type TFilterType, useMenu } from '../model/menu-context'

const FilterType = () => {
  return (
    <div className="flex gap-2 px-3">
      <FilterButton type="ALBUM" />
      <FilterButton type="ARTIST" />
    </div>
  )
}

export { FilterType }

const FilterButton = ({ type }: { type: TFilterType }) => {
  const { filter, setFilter } = useMenu()
  const handleClick = () => {
    setFilter(type)
    document.cookie = `left-panel:filter=${type}`
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        'rounded-full px-3 py-1 text-xs text-gray-0',
        type === filter
          ? 'bg-gray-0 text-gray-900'
          : 'bg-gray-400 hover:bg-gray-300',
      )}
    >
      {type === 'ALBUM' ? 'Albums' : 'Artists'}
    </button>
  )
}
