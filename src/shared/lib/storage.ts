import 'server-only'

type TInMemoryStorageContract = {
  save(params: TSaveParams): Promise<void>
  get(key: string): Promise<string | null>
  del(key: string): Promise<void>
}

class InMemoryStorage implements TInMemoryStorageContract {
  readonly #store: Map<string, TStorageEntry>

  constructor() {
    this.#store = new Map()
    this.#startCleanupInterval()
  }

  async save({ key, ttlSec, value }: TSaveParams): Promise<void> {
    const expiresAt = Date.now() + ttlSec * 1000
    this.#store.set(key, { value, expiresAt })
  }

  async get(key: string): Promise<string | null> {
    const entry = this.#store.get(key)

    if (!entry) {
      return null
    }

    // TTL 체크
    if (Date.now() > entry.expiresAt) {
      this.#store.delete(key)
      return null
    }

    return entry.value
  }

  async del(key: string): Promise<void> {
    this.#store.delete(key)
  }

  // 만료된 항목을 주기적으로 정리
  #startCleanupInterval() {
    setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of this.#store.entries()) {
        if (now > entry.expiresAt) {
          this.#store.delete(key)
        }
      }
    }, 60000) // 1분마다 정리
  }
}

export { InMemoryStorage, type TInMemoryStorageContract }

type TSaveParams = {
  key: string
  ttlSec: number
  value: string
}

type TStorageEntry = {
  value: string
  expiresAt: number // timestamp
}
