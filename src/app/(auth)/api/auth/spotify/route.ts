import { authStorage } from '@/features/login'
import { authFetchInstance } from '@/shared/api'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code') as string
  const stateWithAuthRequestId = searchParams.get('state') as string // CSRF 방지용으로, authorization_url에 포함된 state와 비교

  const authRequestIdFromSpotify = stateWithAuthRequestId.split(':')[0]
  const authStateFromSpotify = stateWithAuthRequestId.split(':')[1]

  if (!code || !stateWithAuthRequestId)
    return NextResponse.json(
      { error: 'No code or state provided' },
      { status: 400 },
    )

  try {
    const storage = authStorage()
    const authDataFromStorage = await storage.get(authRequestIdFromSpotify)

    if (!authDataFromStorage) {
      return NextResponse.json(
        { error: 'Invalid or expired auth request' },
        { status: 400 },
      )
    }

    if (authDataFromStorage.state !== authStateFromSpotify) {
      return NextResponse.json(
        { error: 'Invalid state parameter' },
        { status: 400 },
      )
    }

    const response = await authFetchInstance.post('/spotify-callback', {
      code,
      code_verifier: authDataFromStorage.codeVerifier,
    })

    const sessionId = extractSessionId(response.headers.get('set-cookie')!)
    if (!sessionId) {
      return NextResponse.json(
        { error: 'No session id received from BE' },
        { status: 500 },
      )
    }

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'sessionId',
      value: sessionId,
      httpOnly: true,
      secure: true, // HTTPS에서만 전송
      sameSite: 'lax', // CSRF 방지
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7일
    })

    // 사용된 state 삭제
    await storage.del(authRequestIdFromSpotify)

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

const extractSessionId = (encodedString: string) => {
  const decodedString = decodeURIComponent(encodedString)

  const match = decodedString.match(/sessionId=([^;]+)/)
  return match ? match[1] : null
}
