import { FaCheck } from 'react-icons/fa6'
import { FiGrid } from 'react-icons/fi'
import { IoListSharp } from 'react-icons/io5'
import { PiListBold } from 'react-icons/pi'
import { Menu, MenuButton, MenuItem, MenuList } from '@/shared/ui'
import { type TViewAs, useMenu } from '../model/menu-context'

const viewOptions: Record<TViewAs, { label: string; icon: any }> = {
  COMPACT: {
    label: 'Compact',
    icon: PiListBold,
  },
  LIST: {
    label: 'List',
    icon: IoListSharp,
  },
  GRID: {
    label: 'Grid',
    icon: FiGrid,
  },
}

const ChangeView = () => {
  const { viewAs, setViewAs } = useMenu()

  const handleClick = (value: TViewAs) => {
    setViewAs(value)
    document.cookie = `left-panel:view-as=${value}`
  }

  const IconComponent = viewOptions[viewAs].icon

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as="button"
        className="my-auto"
        aria-label="Create playlist or folder"
      >
        <div className="flex items-center gap-1">
          <span>{viewOptions[viewAs].label}</span>
          <IconComponent size="1.5rem" />
        </div>
      </MenuButton>
      <MenuList>
        {Object.entries(viewOptions).map(([key, value]) => {
          const ItemIcon = value.icon
          return (
            <MenuItem
              key={key}
              onClick={() => handleClick(key as TViewAs)}
              className={viewAs === key ? 'text-spotifyGreen' : ''}
              iconLeft={<ItemIcon size="1rem" />}
              iconRight={viewAs === key && <FaCheck size="1rem" />}
            >
              {value.label}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

export { ChangeView }
