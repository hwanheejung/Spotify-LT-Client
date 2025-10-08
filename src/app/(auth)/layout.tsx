import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Spotify-LT - 로그인',
  description: 'Spotify 로그인 페이지',
}

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}
