'use client'

import { FiSearch } from 'react-icons/fi'
import { useLayoutStore } from '@/shared/ui'
import { ChangeView } from './change-view'
import { CreateButton } from './create-button'
import { FilterType } from './filter-type'
import {
  CollapsePanelButton,
  ExpandPanelButton,
  TogglePanelButton,
} from './toggle-panel-buttons'

const YourLibraryHeader = () => {
  const { leftPanelState } = useLayoutStore()

  if (leftPanelState === 'COLLAPSED')
    return (
      <div className="flex items-center justify-center px-3 py-4">
        <ExpandPanelButton />
      </div>
    )

  return (
    <div className="text-gray-200">
      <div className="flex items-center justify-between px-3 py-4">
        <CollapsePanelButton />
        <div className="mr-3 flex items-center gap-3">
          <CreateButton />
          <TogglePanelButton />
        </div>
      </div>
      <FilterType />
      {leftPanelState === 'DEFAULT' && <DefaultHeader />}
      {leftPanelState === 'EXPANDED' && <ExpandedHeader />}
    </div>
  )
}

export { YourLibraryHeader }

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
