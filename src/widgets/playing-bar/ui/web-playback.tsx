/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client'

import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { usePlaybackStore } from '@/features/play-track'
import { getSpotifyToken } from '@/lib/api/auth'

const WebPlayback = ({ children }: { children: ReactNode }) => {
  const {
    setPlayer,
    playerName,
    setCurrentTrack,
    setIsPaused,
    setIsActive,
    setDeviceId,
  } = usePlaybackStore()

  const playerRef = useRef<Spotify.Player | null>(null)
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  const startStatePolling = useCallback(() => {
    pollingInterval.current = setInterval(async () => {
      const player = playerRef.current
      if (!player) return

      const state = await player.getCurrentState()
      if (!state) return

      const {
        duration,
        position,
        track_window: { current_track },
        paused,
      } = state

      const _current_track = {
        id: current_track.id,
        name: current_track.name,
        is_playable: current_track.is_playable,
        album: {
          name: current_track.album.name,
          images: current_track.album.images,
        },
        artists: current_track.artists,
        duration,
        position,
      }

      setCurrentTrack(_current_track)
      setIsPaused(paused)
    }, 1000)
  }, [setCurrentTrack, setIsPaused])

  const stopStatePolling = useCallback(() => {
    if (pollingInterval.current) clearInterval(pollingInterval.current)
  }, [])

  const connectPlayer = () => {
    const player = playerRef.current
    if (!player) return
    player.connect().then((success) => {
      if (success) {
        console.log('Player connected successfully')
        startStatePolling()
      } else console.error('Player connection failed')
    })
  }

  const addPlayerListeners = () => {
    const player = playerRef.current
    if (!player) return
    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id)
    })
    player.addListener('not_ready', ({ device_id }) => {
      console.error(`Device ID ${device_id} went offline`)
    })
    player.addListener('player_state_changed', (state) => {
      if (!state) setIsActive(false)
      else setIsActive(true)
    })
  }

  const handlePlayerError = async () => {
    const player = playerRef.current
    if (!player) return
    player.addListener('authentication_error', ({ message }) => {
      console.error('Authentication error:', message)
    })

    player.addListener('account_error', ({ message }) => {
      console.error('Account error:', message)
    })

    player.addListener('playback_error', ({ message }) => {
      console.error('Playback error:', message)
    })
  }

  const waitForSpotifySDK = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (typeof window.Spotify !== 'undefined') resolve()
      else window.onSpotifyWebPlaybackSDKReady = () => resolve()
    })
  }, [])

  const initializePlayer = useCallback(async () => {
    const token = await getSpotifyToken()
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    await waitForSpotifySDK()

    const player = new window.Spotify.Player({
      name: playerName,
      getOAuthToken: (cb) => cb(token),
      volume: 0.5,
    })

    playerRef.current = player
    setPlayer(player)

    addPlayerListeners()
    connectPlayer()
    handlePlayerError()
  }, [
    setPlayer,
    playerName,
    addPlayerListeners,
    connectPlayer,
    handlePlayerError,
    waitForSpotifySDK,
  ])

  useEffect(() => {
    initializePlayer()

    return () => {
      stopStatePolling()
      playerRef.current?.disconnect()
    }
  }, [initializePlayer, stopStatePolling])

  return <div className="grid w-full grid-cols-3 px-5 py-2">{children}</div>
}

export { WebPlayback }
