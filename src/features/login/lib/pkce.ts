import { createHash, randomBytes } from 'node:crypto'

type TPkceContract = {
  codeChallengeMethod: string
  codeVerifier: string
  codeChallenge: string
}

/**
 * PKCE(Proof Key for Code Exchange) 인증을 위한 code verifier와 code challenge를 관리합니다.
 */
class Pkce implements TPkceContract {
  readonly #verifier: string
  readonly #challenge: string
  readonly #method: string

  constructor() {
    this.#verifier = randomBytes(32).toString('base64url')
    this.#challenge = createHash('sha256')
      .update(this.#verifier)
      .digest('base64url')
    this.#method = 'S256'
  }

  get codeChallengeMethod(): string {
    return this.#method
  }

  get codeVerifier(): string {
    return this.#verifier
  }

  get codeChallenge(): string {
    return this.#challenge
  }
}

export { Pkce }
