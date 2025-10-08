'use client'

import { throttle } from 'lodash'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  type ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels'
import { useLayoutStore } from '@/lib/stores/layout.store'

export const LEFT_PANNEL_SIZE = Object.freeze({
  COLLAPSED: 6,
  DEFAULT: 25,
  EXPANDED: 40,
  MIN: 20,
  MAX: 50,
})

export const RIGHT_PANNEL_SIZE = Object.freeze({
  DEFAULT: 30,
  MIN: 20,
  MAX: 40,
})

export const MAIN_PANNEL_SIZE = Object.freeze({
  DEFAULT: 40,
  MIN: 30,
  MAX: 100,
})

const ResizablePanelGroup = ({ children }: { children: ReactNode }) => {
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

const ResizablePanelLeft = ({ children, defaultSize }: TPanelProps) => {
  const ref = useRef<ImperativePanelHandle>(null!)
  const { setLeftPanelRef, leftPanelState, setLeftPanelState } =
    useLayoutStore()

  const [isCollapsed, setIsCollapsed] = useState(false)

  // Set panel reference
  useEffect(() => {
    setLeftPanelRef(ref)
  }, [setLeftPanelRef])

  // Observe resize changes
  const observeResize = useCallback(() => {
    if (!ref.current) return () => {}

    const element = document.querySelector(
      `[data-panel-id="${ref.current.getId()}"]`,
    ) as HTMLElement | null
    if (!element) return () => {}

    const handleResize = throttle(() => {
      const collapsed = ref.current?.isCollapsed()
      if (collapsed !== isCollapsed) setIsCollapsed(collapsed || false)
    }, 200)

    const resizeObserver = new ResizeObserver(handleResize)

    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element)
      handleResize.cancel()
    }
  }, [isCollapsed])

  useEffect(() => {
    const cleanup = observeResize()
    return cleanup
  }, [observeResize])

  // Sync `isCollapsed` with `leftPanelState`
  useEffect(() => {
    if (isCollapsed && leftPanelState !== 'COLLAPSED')
      setLeftPanelState('COLLAPSED')
    else if (!isCollapsed && leftPanelState === 'COLLAPSED')
      setLeftPanelState('DEFAULT')
  }, [isCollapsed, leftPanelState, setLeftPanelState])

  const sizes = useMemo(
    () => ({
      COLLAPSED: LEFT_PANNEL_SIZE.COLLAPSED,
      DEFAULT: LEFT_PANNEL_SIZE.DEFAULT,
      EXPANDED: LEFT_PANNEL_SIZE.EXPANDED,
    }),
    [],
  )

  // Handle panel collapse/expand based on state
  useEffect(() => {
    if (!ref.current) return
    ref.current.resize(sizes[leftPanelState])
  }, [leftPanelState, sizes])

  return (
    <Panel
      defaultSize={defaultSize}
      minSize={LEFT_PANNEL_SIZE.MIN}
      maxSize={LEFT_PANNEL_SIZE.MAX}
      ref={ref}
      collapsible
      collapsedSize={LEFT_PANNEL_SIZE.COLLAPSED}
    >
      {children}
    </Panel>
  )
}

const ResizablePanelMain = ({ children, defaultSize }: TPanelProps) => {
  const ref = useRef<ImperativePanelHandle>(null!)
  const { setMainPanelRef } = useLayoutStore()

  useEffect(() => {
    if (ref.current) setMainPanelRef(ref)
  }, [setMainPanelRef])

  return (
    <Panel
      defaultSize={defaultSize}
      minSize={MAIN_PANNEL_SIZE.MIN}
      maxSize={MAIN_PANNEL_SIZE.MAX}
      ref={ref}
      className="rounded-lg bg-gray-700"
    >
      {children}
    </Panel>
  )
}

const ResizablePanelRight = ({ children, defaultSize }: TPanelProps) => {
  const ref = useRef<ImperativePanelHandle>(null!)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { setRightPanelRef, rightPanelState, setRightPanelState } =
    useLayoutStore()

  // Set panel reference
  useEffect(() => {
    if (ref.current) setRightPanelRef(ref)
  }, [setRightPanelRef])

  // Observe resize changes
  useEffect(() => {
    if (!ref.current) return () => {}

    const element = document.querySelector(
      `[data-panel-id="${ref.current.getId()}"]`,
    ) as HTMLElement | null
    if (!element) return () => {}

    const handleResize = throttle(() => {
      const collapsed = ref.current?.isCollapsed()
      if (collapsed !== isCollapsed) setIsCollapsed(collapsed || false)
    }, 200)

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element) // Cleanup observer
      handleResize.cancel() // Cleanup throttle
    }
  }, [isCollapsed])

  // Handle panel collapse/expand based on state
  useEffect(() => {
    if (!ref.current) return

    if (rightPanelState) ref.current.expand()
    else ref.current.collapse()
  }, [rightPanelState])

  // Sync `isCollapsed` with `rightPanelState`
  useEffect(() => {
    if (ref.current) {
      if (isCollapsed && rightPanelState) setRightPanelState(null)
      if (!isCollapsed && !rightPanelState) setRightPanelState('NOW_PLAYING')
    }
  }, [isCollapsed, rightPanelState, setRightPanelState])

  return (
    <Panel
      defaultSize={defaultSize}
      collapsible
      minSize={RIGHT_PANNEL_SIZE.MIN}
      maxSize={RIGHT_PANNEL_SIZE.MAX}
      ref={ref}
    >
      {children}
    </Panel>
  )
}

const ResizablePanelHandler = () => (
  <PanelResizeHandle
    className="w-px hover:bg-gray-100"
    aria-label="Resizable panel"
  />
)

export const ResizablePanel = Object.assign(ResizablePanelGroup, {
  Group: ResizablePanelGroup,
  Left: ResizablePanelLeft,
  Main: ResizablePanelMain,
  Right: ResizablePanelRight,
  Handler: ResizablePanelHandler,
})

type TPanelProps = {
  children: ReactNode
  defaultSize: number
}
