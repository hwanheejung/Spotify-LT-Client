import { Fetch } from './fetch'

const createAuthFetchInstance = (destination: 'BE' | 'BFF') => {
  return new Fetch({
    baseURL:
      destination === 'BFF'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
        : `${process.env.NEXT_PUBLIC_API_HOST}/api/auth`,
    requestInterceptors: [
      (config) => {
        return {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'application/json',
          },
        }
      },
    ],
    errorInterceptors: [
      (error) => {
        console.error('[Auth] Request failed:', error)

        // 401 에러 시 로그인 페이지로 리다이렉트
        if (
          error instanceof Error &&
          'status' in error &&
          error.status === 401
        ) {
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }

        return error
      },
    ],
    config: {
      credentials: 'include',
      cache: 'no-store',
    },
  })
}

const authFetchInstance = createAuthFetchInstance('BE')
const bffAuthFetchInstance = createAuthFetchInstance('BFF')

export { authFetchInstance, bffAuthFetchInstance }
