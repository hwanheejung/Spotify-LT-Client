'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Fetch } from './fetch'

const createAppFetchInstance = async () => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  return new Fetch({
    requestInterceptors: [
      (config) => {
        return {
          cache: 'force-cache',
          credentials: 'include',
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...(sessionId ? { Cookie: `sessionId=${sessionId}` } : {}),
            ...config.headers,
          },
        }
      },
    ],
    errorInterceptors: [
      (error) => {
        if (
          error instanceof Error &&
          'status' in error &&
          error.status === 401
        ) {
          // 401 에러 시 쿠키 삭제 후 리다이렉트
          cookieStore.delete('sessionId')
          redirect('/login')
        }
        return error
      },
    ],
  })
}

export { createAppFetchInstance }
