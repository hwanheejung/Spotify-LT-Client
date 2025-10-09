import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type DividerProps = HTMLAttributes<HTMLDivElement>

const Divider = ({ className, ...props }: DividerProps) => (
  <div
    // aria-orientation="horizontal"
    className={twMerge('h-[0.5px] w-full bg-gray-200/60', className)}
    {...props}
  />
)

export default Divider
