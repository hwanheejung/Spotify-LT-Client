import { HttpError } from './http-error'

class Fetch implements TFetchContract {
  readonly #baseURL: string
  readonly #requestInterceptors: TRequestInterceptor[]
  readonly #responseInterceptors: TResponseInterceptor[]
  readonly #errorInterceptors: TErrorInterceptor[]
  readonly #config: RequestInit

  constructor({
    requestInterceptors = [],
    responseInterceptors = [],
    errorInterceptors = [],
    config = {},
    baseURL,
  }: TParams = {}) {
    this.#baseURL = baseURL ?? process.env.NEXT_PUBLIC_API_HOST ?? ''
    this.#requestInterceptors = requestInterceptors
    this.#responseInterceptors = responseInterceptors
    this.#errorInterceptors = errorInterceptors

    const headers = new Headers(config.headers)
    if (!headers.has('Accept')) headers.set('Accept', 'application/json')

    this.#config = {
      ...config,
      headers,
    }

    this.#validate()
  }

  #validate(): void {
    if (!this.#baseURL) {
      throw new Error('API host (baseURL) is required')
    }
  }

  #buildURL(input: string | URL, params?: Record<string, unknown>): string {
    const base = input.toString().startsWith('http')
      ? new URL(input.toString())
      : new URL(`${this.#baseURL}${input}`)

    if (!params) return base.toString()

    const sp = base.searchParams
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined) continue
      if (Array.isArray(v)) {
        v.forEach((item) => sp.append(k, String(item)))
      } else if (v instanceof Date) {
        sp.set(k, v.toISOString())
      } else if (typeof v === 'object') {
        sp.set(k, JSON.stringify(v))
      } else {
        sp.set(k, String(v))
      }
    }
    base.search = sp.toString()
    return base.toString()
  }

  async #applyRequestInterceptors(
    config: TRequestConfig,
  ): Promise<TRequestConfig> {
    let processed = config
    for (const interceptor of this.#requestInterceptors) {
      try {
        processed = await interceptor(processed)
      } catch {
        // 인터셉터 에러 시 체인을 중단하지 않고 그대로 진행
        // 필요하다면 여기서 로깅
      }
    }
    return processed
  }

  async #applyResponseInterceptors<T>(
    resp: TResponseData<T>,
  ): Promise<TResponseData<T>> {
    let processed = resp
    for (const interceptor of this.#responseInterceptors) {
      try {
        const out = await interceptor<T>(processed)
        if (out) processed = out as TResponseData<T>
      } catch {}
    }
    return processed
  }

  async #applyErrorInterceptors(error: unknown): Promise<unknown> {
    let processed = error
    for (const interceptor of this.#errorInterceptors) {
      try {
        processed = await interceptor(processed)
      } catch {}
    }
    return processed
  }

  async #request<T = unknown>(
    config: TRequestConfig,
  ): Promise<TResponseData<T>> {
    const processedConfig = await this.#applyRequestInterceptors(config)

    const url = this.#buildURL(
      processedConfig.url || '',
      processedConfig.params,
    )

    const mergedHeaders = new Headers(this.#config.headers ?? {})
    const userHeaders = new Headers(processedConfig.headers ?? {})
    userHeaders.forEach((v, k) => mergedHeaders.set(k, v))

    const hasBody =
      processedConfig.body !== undefined && processedConfig.body !== null
    const isJsonLikeBody =
      hasBody &&
      !this.#isStreamLike(processedConfig.body) &&
      typeof processedConfig.body !== 'string' &&
      !(processedConfig.body instanceof ArrayBuffer) &&
      !ArrayBuffer.isView(processedConfig.body as any)

    if (isJsonLikeBody && !mergedHeaders.has('Content-Type')) {
      mergedHeaders.set('Content-Type', 'application/json')
    }

    if (!mergedHeaders.has('Accept')) {
      mergedHeaders.set('Accept', 'application/json')
    }

    // timeout/AbortSignal
    const externalSignal = processedConfig.signal
    const controller = new AbortController()
    const timeoutId =
      processedConfig.timeout && processedConfig.timeout > 0
        ? setTimeout(() => controller.abort(), processedConfig.timeout)
        : null
    const signal = externalSignal
      ? anySignal([externalSignal, controller.signal])
      : controller.signal

    // retry
    const maxRetries = Math.max(0, processedConfig.retries ?? 0)
    const baseDelay = processedConfig.retryDelay ?? 300

    // request (retry loop)
    let attempt = 0
    while (true) {
      try {
        const fetchOptions: RequestInit = {
          ...this.#config,
          ...processedConfig,
          headers: mergedHeaders,
          signal,
        }

        const response = await fetch(url, fetchOptions)

        // 타임아웃 해제
        if (timeoutId) clearTimeout(timeoutId)

        // 7) 응답 파싱
        const ct = response.headers.get('content-type') ?? ''
        const isNoContent = [204, 205].includes(response.status)
        const responseType: TResponseType =
          processedConfig.responseType ?? 'auto'

        let data: T | undefined
        if (!isNoContent) {
          const wantsJson =
            responseType === 'json' ||
            (responseType === 'auto' &&
              /json|problem\+json|vnd\.api\+json/i.test(ct))
          const wantsText =
            responseType === 'text' ||
            (responseType === 'auto' && /text\//i.test(ct))

          if (wantsJson) {
            data = (await this.#safeJson<T>(response)) as T
          } else if (wantsText) {
            data = (await response.text()) as unknown as T
          } else if (responseType === 'arrayBuffer') {
            data = (await response.arrayBuffer()) as unknown as T
          } else if (responseType === 'blob' || responseType === 'auto') {
            data = (await response.blob()) as unknown as T
          }
        }

        const responseData: TResponseData<T> = {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url,
          raw: response,
        }

        // HTTP error handling
        if (!response.ok) {
          const message = `HTTP Error: ${response.status} ${response.statusText}`
          throw new HttpError<T>(message, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data,
            url,
          })
        }

        // response interceptor
        const processedResponse =
          await this.#applyResponseInterceptors<T>(responseData)
        return processedResponse
      } catch (err: any) {
        // 타임아웃 해제
        if (timeoutId) clearTimeout(timeoutId)

        // 재시도 가능한지 판단
        const isAbort = err?.name === 'AbortError'
        const status = err instanceof HttpError ? err.status : undefined

        const retriableStatus =
          status === 429 || status === 503 || status === 502 || status === 504
        const retriableNetwork = !status && !isAbort // 네트워크 에러 추정

        if (attempt < maxRetries && (retriableStatus || retriableNetwork)) {
          const delay = baseDelay * Math.pow(2, attempt) // 지수 백오프
          await new Promise((r) => setTimeout(r, delay))
          attempt += 1
          continue
        }

        // error interceptor
        const processedError = await this.#applyErrorInterceptors(err)
        throw processedError
      }
    }
  }

  async get<T = unknown>(
    url: string,
    config?: TRequestConfig,
  ): Promise<TResponseData<T>> {
    return this.#request<T>({
      ...config,
      url,
      method: 'GET',
      body: undefined,
    })
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ): Promise<TResponseData<T>> {
    return this.#request<T>({
      ...config,
      url,
      method: 'POST',
      body: this.#normalizeBody(data),
    })
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ): Promise<TResponseData<T>> {
    return this.#request<T>({
      ...config,
      url,
      method: 'PUT',
      body: this.#normalizeBody(data),
    })
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ): Promise<TResponseData<T>> {
    return this.#request<T>({
      ...config,
      url,
      method: 'PATCH',
      body: this.#normalizeBody(data),
    })
  }

  async delete<T = unknown>(
    url: string,
    config?: TRequestConfig,
  ): Promise<TResponseData<T>> {
    return this.#request<T>({
      ...config,
      url,
      method: 'DELETE',
      body: undefined,
    })
  }

  #normalizeBody(body: unknown): BodyInit | undefined {
    if (body === undefined || body === null) return undefined
    if (this.#isStreamLike(body)) return body as BodyInit
    if (typeof body === 'string') return body
    if (body instanceof ArrayBuffer || ArrayBuffer.isView(body))
      return body as BodyInit
    // 나머지는 JSON 직렬화
    return JSON.stringify(body)
  }

  #isStreamLike(body: unknown): boolean {
    return (
      body instanceof FormData ||
      body instanceof Blob ||
      (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream)
    )
  }

  async #safeJson<T = unknown>(res: Response): Promise<T | undefined> {
    const len = res.headers.get('content-length')
    if (len === '0') return undefined
    const text = await res.text()
    if (!text) return undefined
    try {
      return JSON.parse(text) as T
    } catch {
      return undefined
    }
  }
}

export { Fetch }

function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController()
  const onAbort = () => controller.abort()
  signals.forEach((s) => {
    if (s.aborted) onAbort()
    else s.addEventListener('abort', onAbort, { once: true })
  })
  return controller.signal
}

type TResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'auto'

type TResponseData<T = unknown> = {
  data: T | undefined
  status: number
  statusText: string
  headers: Headers
  url: string
  raw?: Response // raw Response 접근이 필요할 때 사용
}

type TRequestConfig = RequestInit & {
  url?: string
  baseURL?: string
  timeout?: number // ms
  params?: Record<string, unknown>
  responseType?: TResponseType
  retries?: number // 429/503 등 재시도 횟수 (기본 0)
  retryDelay?: number // ms, 지수백오프 기본값과 함께 사용 가능
}

type TRequestInterceptor = (
  config: TRequestConfig,
) => TRequestConfig | Promise<TRequestConfig>

type TResponseInterceptor = <T = unknown>(
  response: TResponseData<T>,
) => TResponseData<T> | Promise<TResponseData<T>>

type TErrorInterceptor = (error: unknown) => unknown | Promise<unknown>

type TFetchContract = {
  get: <T = unknown>(
    url: string,
    config?: TRequestConfig,
  ) => Promise<TResponseData<T>>
  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ) => Promise<TResponseData<T>>
  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ) => Promise<TResponseData<T>>
  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig,
  ) => Promise<TResponseData<T>>
  delete: <T = unknown>(
    url: string,
    config?: TRequestConfig,
  ) => Promise<TResponseData<T>>
}

type TParams = {
  requestInterceptors?: TRequestInterceptor[]
  responseInterceptors?: TResponseInterceptor[]
  errorInterceptors?: TErrorInterceptor[]
  config?: RequestInit
  baseURL?: string
}
