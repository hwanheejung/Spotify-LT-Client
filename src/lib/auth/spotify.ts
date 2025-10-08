// Spotify OAuth 관련 유틸리티 함수들
// TODO: 실제 Spotify OAuth 구현

export const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''

export const SPOTIFY_REDIRECT_URI =
  process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || ''

export const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-top-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ')

/**
 * Spotify OAuth 로그인 URL 생성
 */
export function getSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SPOTIFY_SCOPES,
    show_dialog: 'true',
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

/**
 * Spotify OAuth 로그인 처리
 */
export function loginWithSpotify(): void {
  const authUrl = getSpotifyAuthUrl()
  window.location.href = authUrl
}

/**
 * URL에서 authorization code 추출
 */
export function getAuthCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null

  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('code')
}

/**
 * 로그인 상태 확인 (임시)
 */
export function isAuthenticated(): boolean {
  // TODO: 실제 인증 상태 확인 로직 구현
  return false
}

/**
 * 로그아웃 처리
 */
export function logout(): void {
  // TODO: 실제 로그아웃 로직 구현
  console.log('Logout called')
}
