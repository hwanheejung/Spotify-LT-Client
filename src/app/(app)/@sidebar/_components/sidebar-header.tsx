'use client'

import { LiaTimesSolid } from 'react-icons/lia'
import { Tooltip, useLayoutStore } from '@/shared/ui'

const SidebarHeader = ({ title }: TProps) => {
  const { setRightPanelState } = useLayoutStore()

  return (
    <div className="flex items-center justify-between px-4 py-5">
      <p className="font-bold">{title}</p>
      <Tooltip label="Close" spacing={10}>
        <button
          onClick={() => setRightPanelState(null)}
          aria-label="close right panel"
        >
          <LiaTimesSolid size="1.3rem" />
        </button>
      </Tooltip>
    </div>
  )
}

export { SidebarHeader }

type TProps = {
  title: string
}
