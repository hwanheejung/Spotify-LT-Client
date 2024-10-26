import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'

const GothamBold = localFont({
  src: '../../public/fonts/GothamBold.ttf',
  variable: '--font-gotham-bold',
})
const GothamBoldItalic = localFont({
  src: '../../public/fonts/GothamBoldItalic.ttf',
  variable: '--font-gotham-bold-italic',
})
const GothamBook = localFont({
  src: '../../public/fonts/GothamBook.ttf',
  variable: '--font-gotham-book',
})
const GothamBookItalic = localFont({
  src: '../../public/fonts/GothamBookItalic.ttf',
  variable: '--font-gotham-book-italic',
})
const GothamLight = localFont({
  src: '../../public/fonts/GothamLight.ttf',
  variable: '--font-gotham-light',
})
const GothamLightItalic = localFont({
  src: '../../public/fonts/GothamLightItalic.ttf',
  variable: '--font-gotham-light-italic',
})
const GothamMedium_1 = localFont({
  src: '../../public/fonts/GothamMedium_1.ttf',
  variable: '--font-gotham-medium-1',
})
const GothamMedium = localFont({
  src: '../../public/fonts/GothamMedium.ttf',
  variable: '--font-gotham-medium',
})
const GothamMediumItalic = localFont({
  src: '../../public/fonts/GothamMediumItalic.ttf',
  variable: '--font-gotham-medium-italic',
})

export const metadata: Metadata = {
  title: 'Spotify',
  description:
    'A Spotify lyrics translation and real-time synchronization tool',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GothamBold.variable} ${GothamBoldItalic.variable} ${GothamBook.variable} ${GothamBookItalic.variable} ${GothamLight.variable} ${GothamLightItalic.variable} ${GothamMedium_1.variable} ${GothamMedium.variable} ${GothamMediumItalic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
