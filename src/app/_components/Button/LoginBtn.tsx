'use client'

import { getSpotifyUrl } from '@/lib/api/auth'

const LoginBtn = () => {
  const handleLogin = async () => {
    const url = await getSpotifyUrl()
    window.location.href = url
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="rounded-full bg-gray-0 px-5 py-2 font-extrabold text-gray-900"
    >
      Login
    </button>
  )
}

export default LoginBtn
