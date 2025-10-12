'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createAppFetchInstance } from '@/shared/api'

const logoutAction = async () => {
  const appFetchInstance = await createAppFetchInstance()
  await appFetchInstance.delete('/logout')

  const cookieStore = await cookies()
  cookieStore.delete('sessionId')

  redirect('/login')
}

export { logoutAction }
