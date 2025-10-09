'use client'

import Form from 'next/form'
import { useActionState } from 'react'
import { FaSpinner, FaSpotify } from 'react-icons/fa'
import { redirectToSpotifyAuthUrl } from '../actions/redirect-to-spotify-auth-url'

const LoginButton = () => {
  const [state, formAction, isPending] = useActionState(
    redirectToSpotifyAuthUrl,
    null,
  )

  return (
    <div className="space-y-4">
      {state?.error && (
        <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <p className="text-red-400 text-sm font-medium">{state.error}</p>
        </div>
      )}

      <Form action={formAction}>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center gap-2 items-center py-4 px-6 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-spotify-green hover:bg-spotify-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isPending ? (
            <>
              <FaSpinner className="animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <FaSpotify />
              Connect with Spotify
            </>
          )}
        </button>
      </Form>
    </div>
  )
}

export { LoginButton }
