export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Album = {
  __typename?: 'Album'
  album_type?: Maybe<Scalars['String']['output']>
  artists?: Maybe<Array<AlbumArtist>>
  copyrights?: Maybe<Array<Maybe<AlbumCopyright>>>
  id: Scalars['String']['output']
  images?: Maybe<Array<Image>>
  label?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  release_date?: Maybe<Scalars['String']['output']>
  total_tracks?: Maybe<Scalars['Int']['output']>
  tracks: Array<AlbumTrack>
  type?: Maybe<Scalars['String']['output']>
  uri?: Maybe<Scalars['String']['output']>
}

export type AlbumArtist = {
  __typename?: 'AlbumArtist'
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
  uri?: Maybe<Scalars['String']['output']>
}

export type AlbumCopyright = {
  __typename?: 'AlbumCopyright'
  text?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type AlbumResult = AlbumResultBase & {
  __typename?: 'AlbumResult'
  album_type?: Maybe<Scalars['String']['output']>
  artists?: Maybe<Array<Maybe<ArtistResultBase>>>
  id?: Maybe<Scalars['String']['output']>
  images?: Maybe<Array<Maybe<Image>>>
  name?: Maybe<Scalars['String']['output']>
  release_date?: Maybe<Scalars['String']['output']>
}

export type AlbumResultBase = {
  id?: Maybe<Scalars['String']['output']>
  images?: Maybe<Array<Maybe<Image>>>
}

export type AlbumTrack = {
  __typename?: 'AlbumTrack'
  artists?: Maybe<Array<Maybe<AlbumArtist>>>
  disc_number?: Maybe<Scalars['Int']['output']>
  duration_ms?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  is_local?: Maybe<Scalars['Boolean']['output']>
  is_playable?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  track_number?: Maybe<Scalars['Int']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type Artist = {
  __typename?: 'Artist'
  followers?: Maybe<Followers>
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  id: Scalars['String']['output']
  images?: Maybe<Array<Maybe<Image>>>
  name?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type ArtistResult = ArtistResultBase & {
  __typename?: 'ArtistResult'
  id?: Maybe<Scalars['String']['output']>
  images?: Maybe<Array<Maybe<Image>>>
  name?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type ArtistResultBase = {
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type CurrentTrack = {
  __typename?: 'CurrentTrack'
  album?: Maybe<PlayerAlbum>
  artists?: Maybe<Array<Maybe<PlayerArtist>>>
  duration_ms?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  lyrics?: Maybe<Lyrics>
  name?: Maybe<Scalars['String']['output']>
}

export type Device = {
  __typename?: 'Device'
  id?: Maybe<Scalars['String']['output']>
  is_active?: Maybe<Scalars['Boolean']['output']>
  is_private_session?: Maybe<Scalars['Boolean']['output']>
  is_restricted?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  supports_volume?: Maybe<Scalars['Boolean']['output']>
  type?: Maybe<Scalars['String']['output']>
  volume_percent?: Maybe<Scalars['Int']['output']>
}

export type Followers = {
  __typename?: 'Followers'
  href?: Maybe<Scalars['String']['output']>
  total?: Maybe<Scalars['Int']['output']>
}

export type Image = {
  __typename?: 'Image'
  height?: Maybe<Scalars['Int']['output']>
  url?: Maybe<Scalars['String']['output']>
  width?: Maybe<Scalars['Int']['output']>
}

export type Lyrics = {
  __typename?: 'Lyrics'
  available: Scalars['Boolean']['output']
  data?: Maybe<LyricsData>
  locked?: Maybe<Scalars['Boolean']['output']>
}

export type LyricsData = {
  __typename?: 'LyricsData'
  id?: Maybe<Scalars['String']['output']>
  plainLyrics?: Maybe<Scalars['String']['output']>
  syncedLyrics?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
  __typename?: 'Mutation'
  playbackTransfer?: Maybe<Scalars['Boolean']['output']>
  startResumePlayback: Scalars['Boolean']['output']
}

export type MutationPlaybackTransferArgs = {
  deviceId: Scalars['String']['input']
}

export type MutationStartResumePlaybackArgs = {
  input: StartResumePlaybackInput
}

export type NewRelease = {
  __typename?: 'NewRelease'
  artists?: Maybe<Array<AlbumArtist>>
  id: Scalars['String']['output']
  images?: Maybe<Array<Image>>
  name: Scalars['String']['output']
}

export type OffsetInput = {
  position?: InputMaybe<Scalars['Int']['input']>
}

export type PlayerAlbum = {
  __typename?: 'PlayerAlbum'
  id?: Maybe<Scalars['String']['output']>
  images?: Maybe<Array<Maybe<Image>>>
  name?: Maybe<Scalars['String']['output']>
}

export type PlayerArtist = {
  __typename?: 'PlayerArtist'
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type PlayerState = {
  __typename?: 'PlayerState'
  currentTrack?: Maybe<CurrentTrack>
  queue: Array<Maybe<PlayerTrack>>
}

export type PlayerTrack = {
  __typename?: 'PlayerTrack'
  album?: Maybe<PlayerAlbum>
  artists?: Maybe<Array<PlayerArtist>>
  duration_ms?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  album?: Maybe<Album>
  artist?: Maybe<Artist>
  availableDevices: Array<Maybe<Device>>
  newReleases?: Maybe<Array<Maybe<NewRelease>>>
  player?: Maybe<PlayerState>
  savedAlbums?: Maybe<Array<Maybe<SavedAlbum>>>
  savedArtists?: Maybe<Array<Maybe<Artist>>>
  search?: Maybe<SearchResult>
}

export type QueryAlbumArgs = {
  albumId: Scalars['String']['input']
}

export type QueryArtistArgs = {
  artistId: Scalars['String']['input']
}

export type QueryNewReleasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QuerySavedAlbumsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QuerySavedArtistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
}

export type QuerySearchArgs = {
  query: Scalars['String']['input']
}

export type SavedAlbum = {
  __typename?: 'SavedAlbum'
  added_at?: Maybe<Scalars['String']['output']>
  album?: Maybe<Album>
}

export type SearchResult = {
  __typename?: 'SearchResult'
  albums?: Maybe<Array<Maybe<AlbumResult>>>
  artists?: Maybe<Array<Maybe<ArtistResult>>>
  tracks?: Maybe<Array<Maybe<TrackResult>>>
}

export type StartResumePlaybackInput = {
  deviceId: Scalars['String']['input']
  id?: InputMaybe<Scalars['String']['input']>
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  offset?: InputMaybe<OffsetInput>
  positionMs?: InputMaybe<Scalars['Int']['input']>
  type: Scalars['String']['input']
}

export type TrackResult = {
  __typename?: 'TrackResult'
  album?: Maybe<AlbumResultBase>
  artists?: Maybe<Array<Maybe<ArtistResultBase>>>
  duration_ms?: Maybe<Scalars['Int']['output']>
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type GetArtistQueryVariables = Exact<{
  artistId: Scalars['String']['input']
}>

export type GetArtistQuery = {
  __typename?: 'Query'
  artist?: {
    __typename?: 'Artist'
    id: string
    name?: string | null
    type?: string | null
    genres?: Array<string | null> | null
    followers?: {
      __typename?: 'Followers'
      href?: string | null
      total?: number | null
    } | null
    images?: Array<{
      __typename?: 'Image'
      url?: string | null
      height?: number | null
      width?: number | null
    } | null> | null
  } | null
}

export type GetAvailableDevicesQueryVariables = Exact<{ [key: string]: never }>

export type GetAvailableDevicesQuery = {
  __typename?: 'Query'
  availableDevices: Array<{
    __typename?: 'Device'
    id?: string | null
    name?: string | null
    type?: string | null
    is_active?: boolean | null
    volume_percent?: number | null
  } | null>
}

export type TransferPlaybackMutationVariables = Exact<{
  deviceId: Scalars['String']['input']
}>

export type TransferPlaybackMutation = {
  __typename?: 'Mutation'
  playbackTransfer?: boolean | null
}

export type StartPlaybackMutationVariables = Exact<{
  input: StartResumePlaybackInput
}>

export type StartPlaybackMutation = {
  __typename?: 'Mutation'
  startResumePlayback: boolean
}

export type GetLyricsQueryVariables = Exact<{ [key: string]: never }>

export type GetLyricsQuery = {
  __typename?: 'Query'
  player?: {
    __typename?: 'PlayerState'
    currentTrack?: {
      __typename?: 'CurrentTrack'
      lyrics?: {
        __typename?: 'Lyrics'
        available: boolean
        locked?: boolean | null
        data?: {
          __typename?: 'LyricsData'
          id?: string | null
          plainLyrics?: string | null
          syncedLyrics?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type GetQueueQueryVariables = Exact<{ [key: string]: never }>

export type GetQueueQuery = {
  __typename?: 'Query'
  player?: {
    __typename?: 'PlayerState'
    currentTrack?: {
      __typename?: 'CurrentTrack'
      id?: string | null
      name?: string | null
      album?: {
        __typename?: 'PlayerAlbum'
        id?: string | null
        name?: string | null
        images?: Array<{
          __typename?: 'Image'
          url?: string | null
        } | null> | null
      } | null
      artists?: Array<{
        __typename?: 'PlayerArtist'
        id?: string | null
        name?: string | null
      } | null> | null
      lyrics?: { __typename?: 'Lyrics'; available: boolean } | null
    } | null
    queue: Array<{
      __typename?: 'PlayerTrack'
      id?: string | null
      name?: string | null
      album?: {
        __typename?: 'PlayerAlbum'
        id?: string | null
        name?: string | null
        images?: Array<{
          __typename?: 'Image'
          url?: string | null
        } | null> | null
      } | null
      artists?: Array<{
        __typename?: 'PlayerArtist'
        id?: string | null
        name?: string | null
      }> | null
    } | null>
  } | null
}

export type GetSearchResultsQueryVariables = Exact<{
  query: Scalars['String']['input']
}>

export type GetSearchResultsQuery = {
  __typename?: 'Query'
  search?: {
    __typename?: 'SearchResult'
    albums?: Array<{
      __typename?: 'AlbumResult'
      id?: string | null
      name?: string | null
      album_type?: string | null
      release_date?: string | null
      images?: Array<{
        __typename?: 'Image'
        url?: string | null
        height?: number | null
        width?: number | null
      } | null> | null
      artists?: Array<{
        __typename?: 'ArtistResult'
        id?: string | null
        name?: string | null
      } | null> | null
    } | null> | null
    artists?: Array<{
      __typename?: 'ArtistResult'
      id?: string | null
      name?: string | null
      type?: string | null
      images?: Array<{
        __typename?: 'Image'
        url?: string | null
        height?: number | null
        width?: number | null
      } | null> | null
    } | null> | null
    tracks?: Array<{
      __typename?: 'TrackResult'
      id?: string | null
      name?: string | null
      duration_ms?: number | null
      album?: {
        __typename?: 'AlbumResult'
        id?: string | null
        images?: Array<{
          __typename?: 'Image'
          url?: string | null
          height?: number | null
          width?: number | null
        } | null> | null
      } | null
      artists?: Array<{
        __typename?: 'ArtistResult'
        id?: string | null
        name?: string | null
      } | null> | null
    } | null> | null
  } | null
}

export type GetAlbumsArtistsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
}>

export type GetAlbumsArtistsQuery = {
  __typename?: 'Query'
  savedAlbums?: Array<{
    __typename?: 'SavedAlbum'
    added_at?: string | null
    album?: {
      __typename?: 'Album'
      id: string
      name: string
      type?: string | null
      images?: Array<{ __typename?: 'Image'; url?: string | null }> | null
      artists?: Array<{
        __typename?: 'AlbumArtist'
        name?: string | null
      }> | null
    } | null
  } | null> | null
  savedArtists?: Array<{
    __typename?: 'Artist'
    id: string
    name?: string | null
    images?: Array<{ __typename?: 'Image'; url?: string | null } | null> | null
  } | null> | null
}

export type GetAlbumQueryVariables = Exact<{
  albumId: Scalars['String']['input']
}>

export type GetAlbumQuery = {
  __typename?: 'Query'
  album?: {
    __typename?: 'Album'
    id: string
    name: string
    album_type?: string | null
    total_tracks?: number | null
    release_date?: string | null
    images?: Array<{
      __typename?: 'Image'
      url?: string | null
      height?: number | null
      width?: number | null
    }> | null
    artists?: Array<{
      __typename?: 'AlbumArtist'
      id?: string | null
      name?: string | null
    }> | null
    tracks: Array<{
      __typename?: 'AlbumTrack'
      id?: string | null
      name?: string | null
      duration_ms?: number | null
      track_number?: number | null
      artists?: Array<{
        __typename?: 'AlbumArtist'
        name?: string | null
      } | null> | null
    }>
  } | null
}

export type GetNewReleasesQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type GetNewReleasesQuery = {
  __typename?: 'Query'
  newReleases?: Array<{
    __typename?: 'NewRelease'
    id: string
    name: string
    images?: Array<{ __typename?: 'Image'; url?: string | null }> | null
    artists?: Array<{
      __typename?: 'AlbumArtist'
      id?: string | null
      name?: string | null
    }> | null
  } | null> | null
}
