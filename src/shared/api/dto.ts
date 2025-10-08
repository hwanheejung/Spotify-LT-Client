export type AlbumItemDTO = {
  added_at: string
  album: {
    id: string
    images: {
      url: string
    }[]
    name: string
    type: string
    artists: {
      name: string
    }[]
  }
}

export type AlbumTrackDTO = {
  id: string
  name: string
  artists: {
    name: string
  }[]
  duration_ms: number
  track_number: number
}

export type AlbumDTO = {
  id: string
  name: string
  images: {
    url: string
    height: number
    width: number
  }[]
  artists: {
    id: string
    name: string
  }[]
  album_type: string
  total_tracks: number
  release_date: string
  tracks: AlbumTrackDTO[]
}

export type DeviceDTO = {
  id: string
  name: string
  type: 'Computer' | 'Smartphone' | 'Speaker'
  is_active: boolean
  volume_percent: number
}

export type ArtistDTO = {
  id: string
  name: string
  images: {
    url: string
    height: number
    width: number
  }[]
  type: string
  followers: {
    href: string
    total: number
  }
  genres: string[]
}

type TrackDTO = {
  id: string
  name: string
  album: {
    id: string
    name: string
    images: {
      url: string
    }[]
  }
  artists: {
    id: string
    name: string
  }[]
}

export type LyricsDTO = {
  available: boolean
  locked: boolean
  data: {
    id: string
    plainLyrics: string
    syncedLyrics: string
  }
}

export type CurrentlyPlayingDTO = TrackDTO & {
  lyrics: Pick<LyricsDTO, 'available'>
}

export type QueueItemDTO = TrackDTO
