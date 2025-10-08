// 인증 관련 타입 정의

export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  country: string
  product: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: SpotifyUser | null
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
}

export interface AuthError {
  error: string
  error_description?: string
}
