class HttpError<T = unknown> extends Error {
  readonly status: number
  readonly statusText: string
  readonly headers: Headers
  readonly data: T | undefined
  readonly url: string

  constructor(
    message: string,
    init: {
      status: number
      statusText: string
      headers: Headers
      data?: T
      url: string
    },
  ) {
    super(message)
    this.name = 'HttpError'
    this.status = init.status
    this.statusText = init.statusText
    this.headers = init.headers
    this.data = init.data
    this.url = init.url
  }
}

export { HttpError }
