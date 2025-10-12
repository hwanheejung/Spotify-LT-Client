import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import 'server-only'

type TAuthStorageContract = {
  save(params: TAuthSaveParams): Promise<void>
  get(authRequestId: string): Promise<TAuthData | null>
  del(authRequestId: string): Promise<void>
}

/**
 * JWT + 쿠키를 사용한 인증 데이터 저장소
 * 서버 사이드에서만 사용되며, 클라이언트에서 조작할 수 없습니다.
 */
class AuthStorage implements TAuthStorageContract {
  readonly #jwtSecret: string
  static #instance: AuthStorage | null = null

  private constructor() {
    this.#jwtSecret = process.env.JWT_SECRET || 'fallback-secret'
    this.#validate()
  }

  static getInstance(): AuthStorage {
    if (!AuthStorage.#instance) {
      AuthStorage.#instance = new AuthStorage()
    }
    return AuthStorage.#instance
  }

  #validate(): void {
    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set, using fallback secret')
    }
  }

  async save({
    authRequestId,
    state,
    codeVerifier,
    ttlSec,
  }: TAuthSaveParams): Promise<void> {
    const authData: TAuthData = {
      state,
      codeVerifier,
      authRequestId,
    }

    // JWT 토큰 생성
    const token = jwt.sign(authData, this.#jwtSecret, {
      expiresIn: ttlSec,
    })

    // HTTP-Only 쿠키로 저장
    const cookieStore = await cookies()
    cookieStore.set({
      name: `auth:${authRequestId}`,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ttlSec,
      path: '/',
    })
  }

  async get(authRequestId: string): Promise<TAuthData | null> {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get(`auth:${authRequestId}`)?.value

      if (!token) {
        return null
      }

      // JWT 토큰 검증 및 디코딩
      const decoded = jwt.verify(token, this.#jwtSecret) as TAuthData
      return decoded
    } catch (error) {
      // JWT 검증 실패 (만료, 조작 등)
      console.error('Auth storage get error:', error)
      return null
    }
  }

  async del(authRequestId: string): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(`auth:${authRequestId}`)
  }
}

const authStorage = () => AuthStorage.getInstance()

export { authStorage }

type TAuthData = {
  state: string
  codeVerifier: string
  authRequestId: string
}

type TAuthSaveParams = {
  authRequestId: string
  state: string
  codeVerifier: string
  ttlSec: number
}
