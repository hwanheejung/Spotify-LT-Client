import { NextResponse } from 'next/server'
import {
  createAuthRequestInstance,
  createAuthRequestStorage,
} from '@/features/login'
import { post } from '@/lib/api/base'

type TAuthStartResponse = {
  authorizationUrl: string
}

export async function GET() {
  const authRequestInstance = createAuthRequestInstance()
  const storage = createAuthRequestStorage()

  try {
    // ③ BFF: authRequestId, code_verifier, state 생성 후 storage에 저장
    const { authRequestId, state, pkce } = authRequestInstance
    await storage.save({
      key: `auth:request:${authRequestId}`,
      value: JSON.stringify({
        state: state,
        codeVerifier: pkce.codeVerifier,
      }),
      ttlSec: 600,
    })

    // ④ BFF → BE (/internal/auth/start): authRequestId, code_challenge, state 전달
    const response = await post('/internal/auth/start', {
      body: JSON.stringify({
        auth_request_id: authRequestId,
        state: state,
        code_challenge: pkce.codeChallenge,
        code_challenge_method: pkce.codeChallengeMethod,
      }),
    })

    const data: TAuthStartResponse = response.data

    // ⑤ BE → BFF: authorization_url 반환 → 302 Redirect
    return NextResponse.redirect(data.authorizationUrl)
  } catch (error) {
    console.error('[Auth Start] Error:', error)
    return NextResponse.json(
      { error: 'Failed to start authentication' },
      { status: 500 },
    )
  }
}
