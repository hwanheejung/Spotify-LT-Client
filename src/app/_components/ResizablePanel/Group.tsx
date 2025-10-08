'use client'

import type { ReactNode } from 'react'
import { PanelGroup } from 'react-resizable-panels'

const ResizableGroup = ({ children }: { children: ReactNode }) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }
  return (
    <PanelGroup
      direction="horizontal"
      onLayout={onLayout}
      className="gap-1 py-3"
    >
      {children}
    </PanelGroup>
  )
}

export default ResizableGroup
