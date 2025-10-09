/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query GetArtist($artistId: String!) {\n    artist(artistId: $artistId) {\n      id\n      name\n      type\n      followers {\n        href\n        total\n      }\n      genres\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n': typeof types.GetArtistDocument
  '\n  query GetAvailableDevices {\n    availableDevices {\n      id\n      name\n      type\n      is_active\n      volume_percent\n    }\n  }\n': typeof types.GetAvailableDevicesDocument
  '\n  mutation TransferPlayback($deviceId: String!) {\n    playbackTransfer(deviceId: $deviceId)\n  }\n': typeof types.TransferPlaybackDocument
  '\n  mutation StartPlayback($input: StartResumePlaybackInput!) {\n    startResumePlayback(input: $input)\n  }\n': typeof types.StartPlaybackDocument
  '\n  query GetLyrics {\n    player {\n      currentTrack {\n        lyrics {\n          available\n          locked\n          data {\n            id\n            plainLyrics\n            syncedLyrics\n          }\n        }\n      }\n    }\n  }\n': typeof types.GetLyricsDocument
  '\n  query GetQueue {\n    player {\n      currentTrack {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n        lyrics {\n          available\n        }\n      }\n\n      queue {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n': typeof types.GetQueueDocument
  '\n  query GetSearchResults($query: String!) {\n    search(query: $query) {\n      albums {\n        id\n        name\n        album_type\n        release_date\n        images {\n          url\n          height\n          width\n        }\n        artists {\n          id\n          name\n        }\n      }\n      artists {\n        id\n        name\n        type\n        images {\n          url\n          height\n          width\n        }\n      }\n      tracks {\n        id\n        name\n        album {\n          id\n          images {\n            url\n            height\n            width\n          }\n        }\n        duration_ms\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n': typeof types.GetSearchResultsDocument
  '\n  query GetAlbumsArtists($offset: Int = 0, $limit: Int = 20, $after: String) {\n    savedAlbums: savedAlbums(offset: $offset, limit: $limit) {\n      added_at\n      album {\n        id\n        images {\n          url\n        }\n        name\n        type\n        artists {\n          name\n        }\n      }\n    }\n    savedArtists: savedArtists(after: $after) {\n      id\n      name\n      images {\n        url\n      }\n    }\n  }\n': typeof types.GetAlbumsArtistsDocument
  '\n  query GetAlbum($albumId: String!) {\n    album(albumId: $albumId) {\n      id\n      name\n      images {\n        url\n        height\n        width\n      }\n      artists {\n        id\n        name\n      }\n      album_type\n      total_tracks\n      release_date\n      tracks {\n        id\n        name\n        artists {\n          name\n        }\n        duration_ms\n        track_number\n      }\n    }\n  }\n': typeof types.GetAlbumDocument
  '\n  query GetNewReleases($offset: Int = 0, $limit: Int = 4) {\n    newReleases(offset: $offset, limit: $limit) {\n      id\n      name\n      images {\n        url\n      }\n      artists {\n        id\n        name\n      }\n    }\n  }\n': typeof types.GetNewReleasesDocument
}
const documents: Documents = {
  '\n  query GetArtist($artistId: String!) {\n    artist(artistId: $artistId) {\n      id\n      name\n      type\n      followers {\n        href\n        total\n      }\n      genres\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n':
    types.GetArtistDocument,
  '\n  query GetAvailableDevices {\n    availableDevices {\n      id\n      name\n      type\n      is_active\n      volume_percent\n    }\n  }\n':
    types.GetAvailableDevicesDocument,
  '\n  mutation TransferPlayback($deviceId: String!) {\n    playbackTransfer(deviceId: $deviceId)\n  }\n':
    types.TransferPlaybackDocument,
  '\n  mutation StartPlayback($input: StartResumePlaybackInput!) {\n    startResumePlayback(input: $input)\n  }\n':
    types.StartPlaybackDocument,
  '\n  query GetLyrics {\n    player {\n      currentTrack {\n        lyrics {\n          available\n          locked\n          data {\n            id\n            plainLyrics\n            syncedLyrics\n          }\n        }\n      }\n    }\n  }\n':
    types.GetLyricsDocument,
  '\n  query GetQueue {\n    player {\n      currentTrack {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n        lyrics {\n          available\n        }\n      }\n\n      queue {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetQueueDocument,
  '\n  query GetSearchResults($query: String!) {\n    search(query: $query) {\n      albums {\n        id\n        name\n        album_type\n        release_date\n        images {\n          url\n          height\n          width\n        }\n        artists {\n          id\n          name\n        }\n      }\n      artists {\n        id\n        name\n        type\n        images {\n          url\n          height\n          width\n        }\n      }\n      tracks {\n        id\n        name\n        album {\n          id\n          images {\n            url\n            height\n            width\n          }\n        }\n        duration_ms\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n':
    types.GetSearchResultsDocument,
  '\n  query GetAlbumsArtists($offset: Int = 0, $limit: Int = 20, $after: String) {\n    savedAlbums: savedAlbums(offset: $offset, limit: $limit) {\n      added_at\n      album {\n        id\n        images {\n          url\n        }\n        name\n        type\n        artists {\n          name\n        }\n      }\n    }\n    savedArtists: savedArtists(after: $after) {\n      id\n      name\n      images {\n        url\n      }\n    }\n  }\n':
    types.GetAlbumsArtistsDocument,
  '\n  query GetAlbum($albumId: String!) {\n    album(albumId: $albumId) {\n      id\n      name\n      images {\n        url\n        height\n        width\n      }\n      artists {\n        id\n        name\n      }\n      album_type\n      total_tracks\n      release_date\n      tracks {\n        id\n        name\n        artists {\n          name\n        }\n        duration_ms\n        track_number\n      }\n    }\n  }\n':
    types.GetAlbumDocument,
  '\n  query GetNewReleases($offset: Int = 0, $limit: Int = 4) {\n    newReleases(offset: $offset, limit: $limit) {\n      id\n      name\n      images {\n        url\n      }\n      artists {\n        id\n        name\n      }\n    }\n  }\n':
    types.GetNewReleasesDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetArtist($artistId: String!) {\n    artist(artistId: $artistId) {\n      id\n      name\n      type\n      followers {\n        href\n        total\n      }\n      genres\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetArtist($artistId: String!) {\n    artist(artistId: $artistId) {\n      id\n      name\n      type\n      followers {\n        href\n        total\n      }\n      genres\n      images {\n        url\n        height\n        width\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAvailableDevices {\n    availableDevices {\n      id\n      name\n      type\n      is_active\n      volume_percent\n    }\n  }\n',
): (typeof documents)['\n  query GetAvailableDevices {\n    availableDevices {\n      id\n      name\n      type\n      is_active\n      volume_percent\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation TransferPlayback($deviceId: String!) {\n    playbackTransfer(deviceId: $deviceId)\n  }\n',
): (typeof documents)['\n  mutation TransferPlayback($deviceId: String!) {\n    playbackTransfer(deviceId: $deviceId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation StartPlayback($input: StartResumePlaybackInput!) {\n    startResumePlayback(input: $input)\n  }\n',
): (typeof documents)['\n  mutation StartPlayback($input: StartResumePlaybackInput!) {\n    startResumePlayback(input: $input)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetLyrics {\n    player {\n      currentTrack {\n        lyrics {\n          available\n          locked\n          data {\n            id\n            plainLyrics\n            syncedLyrics\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetLyrics {\n    player {\n      currentTrack {\n        lyrics {\n          available\n          locked\n          data {\n            id\n            plainLyrics\n            syncedLyrics\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetQueue {\n    player {\n      currentTrack {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n        lyrics {\n          available\n        }\n      }\n\n      queue {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetQueue {\n    player {\n      currentTrack {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n        lyrics {\n          available\n        }\n      }\n\n      queue {\n        id\n        name\n        album {\n          id\n          name\n          images {\n            url\n          }\n        }\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetSearchResults($query: String!) {\n    search(query: $query) {\n      albums {\n        id\n        name\n        album_type\n        release_date\n        images {\n          url\n          height\n          width\n        }\n        artists {\n          id\n          name\n        }\n      }\n      artists {\n        id\n        name\n        type\n        images {\n          url\n          height\n          width\n        }\n      }\n      tracks {\n        id\n        name\n        album {\n          id\n          images {\n            url\n            height\n            width\n          }\n        }\n        duration_ms\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetSearchResults($query: String!) {\n    search(query: $query) {\n      albums {\n        id\n        name\n        album_type\n        release_date\n        images {\n          url\n          height\n          width\n        }\n        artists {\n          id\n          name\n        }\n      }\n      artists {\n        id\n        name\n        type\n        images {\n          url\n          height\n          width\n        }\n      }\n      tracks {\n        id\n        name\n        album {\n          id\n          images {\n            url\n            height\n            width\n          }\n        }\n        duration_ms\n        artists {\n          id\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAlbumsArtists($offset: Int = 0, $limit: Int = 20, $after: String) {\n    savedAlbums: savedAlbums(offset: $offset, limit: $limit) {\n      added_at\n      album {\n        id\n        images {\n          url\n        }\n        name\n        type\n        artists {\n          name\n        }\n      }\n    }\n    savedArtists: savedArtists(after: $after) {\n      id\n      name\n      images {\n        url\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAlbumsArtists($offset: Int = 0, $limit: Int = 20, $after: String) {\n    savedAlbums: savedAlbums(offset: $offset, limit: $limit) {\n      added_at\n      album {\n        id\n        images {\n          url\n        }\n        name\n        type\n        artists {\n          name\n        }\n      }\n    }\n    savedArtists: savedArtists(after: $after) {\n      id\n      name\n      images {\n        url\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAlbum($albumId: String!) {\n    album(albumId: $albumId) {\n      id\n      name\n      images {\n        url\n        height\n        width\n      }\n      artists {\n        id\n        name\n      }\n      album_type\n      total_tracks\n      release_date\n      tracks {\n        id\n        name\n        artists {\n          name\n        }\n        duration_ms\n        track_number\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAlbum($albumId: String!) {\n    album(albumId: $albumId) {\n      id\n      name\n      images {\n        url\n        height\n        width\n      }\n      artists {\n        id\n        name\n      }\n      album_type\n      total_tracks\n      release_date\n      tracks {\n        id\n        name\n        artists {\n          name\n        }\n        duration_ms\n        track_number\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetNewReleases($offset: Int = 0, $limit: Int = 4) {\n    newReleases(offset: $offset, limit: $limit) {\n      id\n      name\n      images {\n        url\n      }\n      artists {\n        id\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetNewReleases($offset: Int = 0, $limit: Int = 4) {\n    newReleases(offset: $offset, limit: $limit) {\n      id\n      name\n      images {\n        url\n      }\n      artists {\n        id\n        name\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
