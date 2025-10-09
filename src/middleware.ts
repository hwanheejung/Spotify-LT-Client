import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname

  // 정적 파일과 Next.js 내부 파일은 인증 체크 제외
  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/api') ||
    currentPath.includes('.') // 파일 확장자가 있는 경우 (favicon.ico, etc)
  ) {
    return NextResponse.next()
  }

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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
