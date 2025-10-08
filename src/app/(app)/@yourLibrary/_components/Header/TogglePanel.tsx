import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { IoLibrarySharp } from 'react-icons/io5'
import { Tooltip } from '@/components/tooltip'
import { useLayoutStore } from '@/lib/stores/layout.store'

export const CollapsePanel = () => {
  const { leftPanelRef } = useLayoutStore()
  return (
    <button
      type="button"
      aria-label="Collapse left panel"
      className="flex gap-2 hover:text-gray-0"
      onClick={() => leftPanelRef?.current?.collapse()}
    >
      <IoLibrarySharp size="1.6rem" style={{ paddingBottom: 2 }} />
      <span className="text-md font-bold">Your Library</span>
    </button>
  )
}

export const ExpandPanel = () => {
  const { leftPanelRef } = useLayoutStore()
  return (
    <button
      type="button"
      aria-label="Expand left panel"
      className="flex gap-2 text-gray-200 hover:text-gray-0"
      onClick={() => leftPanelRef?.current?.expand()}
    >
      <IoLibrarySharp size="1.6rem" style={{ paddingBottom: 2 }} />
    </button>
  )
}

export const TogglePanel = () => {
  const { leftPanelState, setLeftPanelState } = useLayoutStore()
  return (
    <button type="button" aria-label="Toggle left panel">
      {leftPanelState === 'EXPANDED' ? (
        <Tooltip label="Show Less" placement="top">
          <GoArrowLeft
            size="1.5rem"
            onClick={() => setLeftPanelState('DEFAULT')}
          />
        </Tooltip>
      ) : (
        <Tooltip label="Show More" placement="top">
          <GoArrowRight
            size="1.5rem"
            onClick={() => setLeftPanelState('EXPANDED')}
          />
        </Tooltip>
      )}
    </button>
  )
}
