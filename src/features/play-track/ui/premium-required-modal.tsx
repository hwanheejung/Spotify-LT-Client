'use client'

import { FaSpotify } from 'react-icons/fa'
import { logoutAction } from '@/features/login'
import { usePremiumStore } from '../model/premium-store'

const PremiumRequiredModal = () => {
  const { isPremiumRequired } = usePremiumStore()

  if (!isPremiumRequired) return null

  const handleUpgrade = () => {
    window.open('https://www.spotify.com/premium/', '_blank')
  }

  return (
    <>
      {/* Backdrop with blur */}
      <div className="fixed inset-0 z-50 backdrop-blur-md bg-gray-900/80" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-700 rounded-lg shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-spotifyGreen/20 p-4 rounded-full">
              <FaSpotify className="text-spotifyGreen" size="3rem" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-0 mb-4">
            Spotify Premium Required
          </h2>

          {/* Description */}
          <p className="text-gray-100 text-center mb-8">
            This feature requires a Spotify Premium account. Upgrade to Premium
            to enjoy unlimited music with enhanced features.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full bg-spotifyGreen hover:bg-spotifyGreenHover text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
            >
              Upgrade to Premium
            </button>

            <button
              onClick={logoutAction}
              className="w-full bg-transparent border border-gray-300 text-gray-0 hover:bg-gray-600 font-medium py-3 px-6 rounded-full transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export { PremiumRequiredModal }
