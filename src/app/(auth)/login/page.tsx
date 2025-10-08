import { FaCheck, FaSpotify } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-dark">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="w-16 h-16 mb-6 bg-spotify-green rounded-full flex items-center justify-center mx-auto">
            <FaSpotify size={36} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-spotify-primary mb-2">
            Spotify-LQ
          </h1>
          <p className="text-spotify-secondary text-lg">Lyrics Quizzes</p>
        </div>

        {/* Premium Notice */}
        <div className="bg-spotify-gray rounded-lg p-6 border border-spotify-light-gray">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 rounded-full bg-spotify-green p-1">
              <FaCheck size={12} className="text-white" />
            </div>
            <div>
              <h3 className="text-spotify-primary font-semibold mb-2">
                Spotify Premium Required
              </h3>
              <p className="text-spotify-secondary text-sm leading-relaxed">
                To use this application, you need an active Spotify Premium
                subscription. This allows us to access your music library and
                provide lyrics quizzes.
              </p>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-8">
          <button className="w-full flex justify-center gap-2 items-center py-4 px-6 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-spotify-green hover:bg-spotify-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105">
            <FaSpotify />
            Connect with Spotify
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-spotify-muted">
          <p>
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
