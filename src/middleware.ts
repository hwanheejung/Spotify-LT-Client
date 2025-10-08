import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/utils/auth/auth'

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => {
    return pathname.startsWith(url)
  })
}

export default async function middleware(req: NextRequest) {
  const protectedRoutes = [
    '/mypage',
    '/album',
    '/artist',
    '/lyrics',
    '/search',
    '/settings',
  ]
  const currentPath = req.nextUrl.pathname

  if (isMatch(currentPath, protectedRoutes)) {
    const { isAuthenticated } = await auth()

    return isAuthenticated
      ? NextResponse.next()
      : NextResponse.redirect(new URL(`/`, req.nextUrl))
  }

  return NextResponse.next()
}
