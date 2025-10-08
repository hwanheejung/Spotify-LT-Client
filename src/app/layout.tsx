import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
  title: 'Spotify-LT',
  description:
    'A Spotify lyrics translation and real-time synchronization tool',
}

export default function RootLayout({ children }: Readonly<TProps>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

type TProps = {
  children: ReactNode
}
