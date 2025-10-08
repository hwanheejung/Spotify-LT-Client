import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname

  // 로그인 페이지는 인증 체크 없이 통과
  if (currentPath === '/login') {
    return NextResponse.next()
  }

  const sessionId = req.cookies.get('sessionId')
  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
