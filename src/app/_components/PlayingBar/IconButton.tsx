import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const Indicator = ({ selected }: { selected: boolean }) => (
  <div
    className={twMerge(
      'mx-auto mt-0.5 h-1 w-1 rounded-full',
      selected ? 'bg-spotifyGreen' : '',
    )}
  />
)

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  available?: boolean
  selected?: boolean
  icon?: ReactNode
}

const Button = (props: ButtonProps) => {
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

export default Button
