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
  } catch {
    return {
      error: 'No response from server. Please try again later',
    }
  }
}

export { redirectToSpotifyAuthUrl }

type TAuthState = {
  error?: string
}
