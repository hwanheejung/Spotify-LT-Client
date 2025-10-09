'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { HTMLAttributes, ReactNode } from 'react'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import { HiOutlineDeviceMobile } from 'react-icons/hi'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { TbMicrophone2 } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import {
  Tooltip,
  type TPlacement,
  type TTooltipOptions,
  useLayoutStore,
} from '@/shared/ui'

const RightPanelNav = () => {
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
      placement: 'top-end' as TPlacement,
    },
  ]

  return (
    <div className="flex items-center justify-end">
      {navItems.map((item) => (
        <RightPanelNavItem key={item.label} {...item} />
      ))}
    </div>
  )
}

export { RightPanelNav }

const RightPanelNavItem = ({
  label,
  selected,
  onClick,
  icon,
  placement = 'top',
}: TRightPanelNavItemProps) => (
  <Tooltip label={label} spacing={20} placement={placement}>
    <Button
      selected={selected}
      onClick={onClick}
      icon={icon}
      aria-label={label}
    />
  </Tooltip>
)

type TRightPanelNavItemProps = Pick<TTooltipOptions, 'placement'> & {
  label: string
  selected: boolean
  onClick: () => void
  icon: ReactNode
}

const Button = (props: TButtonProps) => {
  const { selected = false, available = true, icon, ...rest } = props

  const getButtonColor = () => {
    if (!available) return 'opacity-40 hover:opacity-50'
    if (selected) return 'text-spotifyGreen'

    return 'text-gray-200 hover:text-gray-0'
  }

  return (
    <button {...rest} className={twMerge(getButtonColor(), 'px-1.5 py-2')}>
      {icon}
      <Indicator selected={selected} />
    </button>
  )
}

const Indicator = ({ selected }: { selected: boolean }) => (
  <div
    className={twMerge(
      'mx-auto mt-0.5 h-1 w-1 rounded-full',
      selected ? 'bg-spotifyGreen' : '',
    )}
  />
)

type TButtonProps = HTMLAttributes<HTMLButtonElement> & {
  available?: boolean
  selected?: boolean
  icon?: ReactNode
}
