import Link from 'next/link'
import type { ReactNode } from 'react'

const Section = (props: TProps) => {
  const { title, children, hasLink } = props

  if (!hasLink)
    return (
      <section className="flex flex-col pt-10">
        <h1 className="text-xl font-extrabold">{title}</h1>
        <div className="flex-1">{children}</div>
      </section>
    )

  const { href, showShowAllText = true } = props
  return (
    <section className="flex flex-col pt-10">
      <div className="flex items-center justify-between">
        <Link href={href} className="text-xl font-extrabold hover:underline">
          {title}
        </Link>
        {showShowAllText && (
          <Link
            href={href}
            className="text-xs font-bold text-gray-200 hover:underline"
          >
            Show all
          </Link>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </section>
  )
}

export { Section }

type TProps = {
  title: string
  children: ReactNode
} & (
  | { hasLink: false }
  | {
      hasLink: true
      href: string
      showShowAllText?: boolean
    }
)
