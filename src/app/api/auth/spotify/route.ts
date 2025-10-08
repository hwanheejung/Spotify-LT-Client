import { type NextRequest, NextResponse } from 'next/server'
import { login } from '@/lib/api/auth'

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
