'use client'

import { FiSearch } from 'react-icons/fi'
import { useLayoutStore } from '@/lib/stores/layout.store'
import ChangeView from './ChangeView'
import CreateButton from './CreateButton'
import FilterType from './FilterType'
import { CollapsePanel, ExpandPanel, TogglePanel } from './TogglePanel'

const ExpandedHeader = () => (
  <div className="mx-3 flex h-10 items-center justify-between border-b-[0.5px] border-gray-500 text-xxs font-bold">
    <span>Title</span>
    <span>Date Added</span>
  </div>
)

const DefaultHeader = () => (
  <div className="mx-3 flex h-10 items-center justify-between border-b-[0.5px] border-gray-500 text-xs font-bold">
    <FiSearch size="1.2rem" />
    <ChangeView />
  </div>
)

const Header = () => {
  const { leftPanelState } = useLayoutStore()

  if (leftPanelState === 'COLLAPSED')
    return (
      <div className="flex items-center justify-center px-3 py-4">
        <ExpandPanel />
      </div>
    )

  return (
    <div className="text-gray-200">
      <div className="flex items-center justify-between px-3 py-4">
        <CollapsePanel />
        <div className="mr-3 flex items-center gap-3">
          <CreateButton />
          <TogglePanel />
        </div>
      </div>
      <FilterType />
      {leftPanelState === 'DEFAULT' && <DefaultHeader />}
      {leftPanelState === 'EXPANDED' && <ExpandedHeader />}
    </div>
  )
}

export default Header
