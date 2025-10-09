import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
  title: 'Spotify-LQ',
  description: 'A Spotify lyrics quizzes',
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
