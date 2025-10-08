'use server'

import { redirect } from 'next/navigation'
import { deleteApi, get } from './base'

export const logout = async () => {
  try {
    await deleteApi('/api/auth/logout')
    // 성공 시 홈으로 리다이렉트
    redirect('/')
  } catch (error) {
    // 401이면 이미 로그아웃된 상태이거나 에러 발생
    // 로그인 페이지로 리다이렉트
    redirect('/login')
  }
}

export const getSpotifyToken = async (): Promise<string> => {
  const { data } = await get('/api/auth/spotify-token')

  return data.token
}
