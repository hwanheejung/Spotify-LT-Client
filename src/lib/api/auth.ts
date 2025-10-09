'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deleteApi, get } from './base'

export const logout = async () => {
  try {
    await deleteApi('/api/auth/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    const cookieStore = await cookies()
    cookieStore.delete('sessionId')

    redirect('/login')
  }
}

export const getSpotifyToken = async (): Promise<string> => {
  const { data } = await get('/api/auth/spotify-token')

  return data.token
}
