'use server'

import { redirect } from 'next/navigation'
import { get } from '@/lib/api/base'

const redirectToSpotifyAuthUrl = async (
  _: TAuthState | null,
  __: FormData,
): Promise<TAuthState> => {
  try {
    const { data } = await get(`/api/auth/spotify-auth-url`)

    redirect(data.url)
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) {
      const digest = (error as any).digest
      if (digest?.startsWith('NEXT_REDIRECT')) {
        throw error
      }
    }

    return {
      error: 'No response from server. Please try again later',
    }
  }
}

export { redirectToSpotifyAuthUrl }

type TAuthState = {
  error?: string
}
