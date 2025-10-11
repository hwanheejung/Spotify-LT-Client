import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { authFetchInstance } from '@/shared/api'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code') as string

  if (!code)
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })

  try {
    await login(code)

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

const login = async (code: string) => {
  const response = await authFetchInstance.post('/spotify-callback', {
    code,
  })

  const sessionId = extractSessionId(response.headers.get('set-cookie')!)
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'sessionId',
    value: sessionId || '',
    httpOnly: true,
    path: '/',
  })

  return response.data
}

const extractSessionId = (encodedString: string) => {
  const decodedString = decodeURIComponent(encodedString)

  const match = decodedString.match(/sessionId=([^;]+)/)
  return match ? match[1] : null
}
