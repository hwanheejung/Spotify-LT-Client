'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import { HiOutlineDeviceMobile } from 'react-icons/hi'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { TbMicrophone2 } from 'react-icons/tb'
import {
  type Placement,
  Tooltip,
  type TooltipOptions,
} from '@/components/tooltip'
import { useLayoutStore } from '@/lib/stores/layout.store'
import Button from './IconButton'

interface SidebarNavItemProps extends Pick<TooltipOptions, 'placement'> {
  label: string
  selected: boolean
  onClick: () => void
  icon: ReactNode
}

const SidebarNavItem = ({
  label,
  selected,
  onClick,
  icon,
  placement = 'top',
}: SidebarNavItemProps) => (
  <Tooltip label={label} spacing={20} placement={placement}>
    <Button
      selected={selected}
      onClick={onClick}
      icon={icon}
      aria-label={label}
    />
  </Tooltip>
)

const SidebarNav = () => {
  const { rightPanelState, setRightPanelState } = useLayoutStore()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Now playing view',
      selected: rightPanelState === 'NOW_PLAYING',
      onClick: () => setRightPanelState('NOW_PLAYING'),
      icon: <AiOutlinePlaySquare size="1.2rem" />,
    },
    {
      label: 'Lyrics',
      selected: pathname === '/lyrics',
      onClick: () => router.push(pathname === '/lyrics' ? '/' : '/lyrics'),
      icon: <TbMicrophone2 size="1.2rem" />,
    },
    {
      label: 'Queue',
      selected: rightPanelState === 'QUEUE',
      onClick: () => setRightPanelState('QUEUE'),
      icon: <HiOutlineQueueList size="1.2rem" />,
    },
    {
      label: 'Connect to a device',
      selected: rightPanelState === 'DEVICE',
      onClick: () => setRightPanelState('DEVICE'),
      icon: <HiOutlineDeviceMobile size="1.2rem" />,
      placement: 'top-end' as Placement,
    },
  ]

  return (
    <div className="flex items-center justify-end">
      {navItems.map((item) => (
        <SidebarNavItem key={item.label} {...item} />
      ))}
    </div>
  )
}

export default SidebarNav
