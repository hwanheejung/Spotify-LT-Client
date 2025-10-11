import { NextResponse } from 'next/server'
import {
  createAuthRequestInstance,
  createAuthRequestStorage,
} from '@/features/login'
import { authFetchInstance } from '@/shared/api/auth-fetch-instance'

type TAuthStartResponse = {
  url: string
}

export async function GET() {
  try {
    const authReqInstance = createAuthRequestInstance()
    const storage = createAuthRequestStorage()

    // ③ BFF: authRequestId, code_verifier, state 생성 후 storage에 저장
    await storage.save({
      key: `auth:request:${authReqInstance.authRequestId}`,
      value: JSON.stringify({
        state: authReqInstance.state,
        codeVerifier: authReqInstance.pkce.codeVerifier,
      }),
      ttlSec: 600,
    })

    // ④ BFF → BE: authRequestId, code_challenge, state 전달
    const response = await authFetchInstance.get<TAuthStartResponse>(
      '/spotify-auth-url',
      {
        params: {
          state: authReqInstance.state,
          code_challenge: authReqInstance.pkce.codeChallenge,
          code_challenge_method: authReqInstance.pkce.codeChallengeMethod,
        },
      },
    )

    const data = response.data

    // authorizationUrl이 없으면 실패 응답
    if (!data?.url) {
      return NextResponse.json(
        {
          success: false,
          message: '인증 URL을 받아올 수 없습니다.',
        },
        { status: 500 },
      )
    }

    // ⑤ BE → BFF: authorization_url 반환
    return NextResponse.json({
      success: true,
      authorizationUrl: data.url,
    })
  } catch (error) {
    console.error('Auth start error:', error)

    return NextResponse.json(
      {
        success: false,
        message: '인증 요청에 실패했습니다.',
      },
      { status: 500 },
    )
  }
}
