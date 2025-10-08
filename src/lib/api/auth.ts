'use server'

import { revalidateTag } from 'next/cache'
import { deleteApi, get } from './base'

export const getSpotifyUrl = async () => {
  const { data } = await get(`/api/auth/spotify-auth-url`)
  return data.url
}

export const logout = async () => {
  await deleteApi('/api/auth/logout')
  revalidateTag('session-status')
}

export const verifySession = async (): Promise<boolean> => {
  const { data } = await get('/api/auth/status', {
    next: {
      revalidate: 60 * 60, // 1 hour
      tags: ['session-status'],
    },
  })
  return data.authenticated
}

export const getSpotifyToken = async (): Promise<string> => {
  const { data } = await get('/api/auth/spotify-token')

  return data.token
}
