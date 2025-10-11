import { randomBytes } from 'node:crypto'
import { InMemoryStorage } from '@/shared/lib/storage'
import { Pkce } from './pkce'

type TAuthRequestContract = {
  authRequestId: string
  state: string
  pkce: Pkce
}

/**
 * OAuth 인증 요청을 관리합니다.
 * authRequestId, state(CSRF 방지용), PKCE를 포함합니다.
 */
class AuthRequest implements TAuthRequestContract {
  readonly #authRequestId: string
  readonly #pkce: Pkce
  readonly #state: string

  constructor() {
    this.#authRequestId = randomBytes(16).toString('base64url')
    this.#state = randomBytes(24).toString('base64url')
    this.#pkce = new Pkce()
  }

  get authRequestId(): string {
    return this.#authRequestId
  }

  get state(): string {
    return this.#state
  }

  get pkce(): Pkce {
    return this.#pkce
  }
}

const createAuthRequestInstance = () => new AuthRequest()
const createAuthRequestStorage = () => new InMemoryStorage()

export { AuthRequest, createAuthRequestInstance, createAuthRequestStorage }
