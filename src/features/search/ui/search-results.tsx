'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { useMemo } from 'react'
import { match, P } from 'ts-pattern'
import type { GetSearchResultsQuery } from '@/shared/graphql'
import { calculateTextSimilarity } from '../lib/calculate-text-similarity'
import { GET_SEARCH_RESULTS } from '../model/queries'
import { Albums } from './albums'
import { Artists } from './artists'
import { Songs } from './songs'
import { TopResult, type TopResultProps } from './top-result'

type SearchData = NonNullable<GetSearchResultsQuery['search']>
type Track = NonNullable<NonNullable<SearchData['tracks']>[number]>
type Album = NonNullable<NonNullable<SearchData['albums']>[number]>
type Artist = NonNullable<NonNullable<SearchData['artists']>[number]>

const SearchResults = ({ query }: { query: string }) => {
  const { data } = useSuspenseQuery<GetSearchResultsQuery>(GET_SEARCH_RESULTS, {
    variables: { query },
  })

  const topResult = useMemo<TopResultProps | null>(() => {
    return match(data.search)
      .with(
        {
          tracks: P.when(
            (tracks) => Array.isArray(tracks) && tracks.length > 0,
          ),
          albums: P.when(
            (albums) => Array.isArray(albums) && albums.length > 0,
          ),
          artists: P.when(
            (artists) => Array.isArray(artists) && artists.length > 0,
          ),
        },
        (search) => {
          const track = search.tracks![0] as Track
          const album = search.albums![0] as Album
          const artist = search.artists![0] as Artist

          const trackScore = calculateTextSimilarity(track.name!, query)
          const albumScore = calculateTextSimilarity(album.name!, query)
          const artistScore = calculateTextSimilarity(artist.name!, query)

          return match({ trackScore, albumScore, artistScore })
            .when(
              ({ trackScore, albumScore, artistScore }) =>
                trackScore >= albumScore && trackScore >= artistScore,
              () => ({ type: 'track' as const, data: track }),
            )
            .when(
              ({ albumScore, trackScore, artistScore }) =>
                albumScore >= trackScore && albumScore >= artistScore,
              () => ({ type: 'album' as const, data: album }),
            )
            .otherwise(() => ({ type: 'artist' as const, data: artist }))
        },
      )
      .otherwise(() => null)
  }, [data, query])

  return match(data.search)
    .with(
      {
        tracks: P.when((tracks) => Array.isArray(tracks) && tracks.length > 0),
        albums: P.when((albums) => Array.isArray(albums) && albums.length > 0),
        artists: P.when(
          (artists) => Array.isArray(artists) && artists.length > 0,
        ),
      },
      (search) => {
        const validTracks = search.tracks!.filter(
          (track): track is Track => track !== null,
        )
        const validAlbums = search.albums!.filter(
          (album): album is Album => album !== null,
        )
        const validArtists = search.artists!.filter(
          (artist): artist is Artist => artist !== null,
        )

        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              {topResult && (
                <TopResult type={topResult.type} data={topResult.data} />
              )}
              <Songs tracks={validTracks} />
            </div>
            <Artists artists={validArtists} />
            <Albums albums={validAlbums} />
          </>
        )
      },
    )
    .otherwise(() => <NoResults />)
}

export { SearchResults }

const NoResults = () => (
  <div className="flex items-center justify-center p-10">
    <div className="text-gray-200">No search results found</div>
  </div>
)
