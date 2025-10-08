import { type NextRequest, NextResponse } from 'next/server'

function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => {
    return pathname.startsWith(url)
  })
}

export default async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname

  // 루트 경로를 login으로 리다이렉트
  if (currentPath === '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 이미 login 페이지에 있으면 리다이렉트하지 않음
  if (currentPath === '/login') {
    return NextResponse.next()
  }

  // TODO: 인증 로직 구현 후 protected routes 체크
  // const protectedRoutes = [
  //   "/mypage",
  //   "/album",
  //   "/artist",
  //   "/lyrics",
  //   "/search",
  //   "/settings",
  // ];

  // if (isMatch(currentPath, protectedRoutes)) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next()
}
