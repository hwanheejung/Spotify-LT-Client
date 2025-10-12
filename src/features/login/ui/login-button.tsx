'use client'

import { useState } from 'react'
import { FaSpinner, FaSpotify } from 'react-icons/fa'
import { bffAuthFetchInstance } from '@/shared/api'

type TAuthStartResponse = {
  success: boolean
  authorizationUrl?: string
  message?: string
}

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data } =
        await bffAuthFetchInstance.get<TAuthStartResponse>('/start')

      if (!data?.success) {
        setError(data?.message || '로그인 요청에 실패했습니다.')
        return
      }

      // Spotify 인증 페이지로 리다이렉트
      if (data?.authorizationUrl) {
        window.location.href = data.authorizationUrl
      } else {
        setError('인증 URL을 받아올 수 없습니다.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('로그인 요청에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="space-y-4">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex justify-center gap-2 items-center py-4 px-6 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-spotify-green hover:bg-spotify-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            로그인 중...
          </>
        ) : (
          <>
            <FaSpotify />
            Connect with Spotify
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <p className="text-red-400 text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  )
}

export { LoginButton }
