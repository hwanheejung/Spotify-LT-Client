'use client'

import { useSuspenseQuery } from '@apollo/client/react'
import { useMemo } from 'react'
import { GET_SEARCH_RESULTS } from '@/lib/queries/search.query'
import { calculateTextSimilarity } from '@/lib/utils/calculate-text-similarity'
import Albums, { type Album } from './Albums'
import Artists, { type Artist } from './Artists'
import Songs, { type Track } from './Songs'
import TopResult, { type TopResultProps } from './TopResult'

type SearchDTO = {
  tracks: Track[]
  albums: Album[]
  artists: Artist[]
}

const ResultContainer = ({ query }: { query: string }) => {
  const { data } = useSuspenseQuery<{ search: SearchDTO }>(GET_SEARCH_RESULTS, {
    variables: { query },
  })

  const topResult = useMemo<TopResultProps>(() => {
    const track = data.search.tracks[0]
    const album = data.search.albums[0]
    const artist = data.search.artists[0]

    const trackScore = calculateTextSimilarity(track.name, query)
    const albumScore = calculateTextSimilarity(album.name, query)
    const artistScore = calculateTextSimilarity(artist.name, query)

    if (trackScore >= albumScore && trackScore >= artistScore)
      return { type: 'track', data: track }

    if (albumScore >= trackScore && albumScore >= artistScore)
      return { type: 'album', data: album }

    return { type: 'artist', data: artist }
  }, [data, query])

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <TopResult type={topResult.type} data={topResult.data} />
        <Songs tracks={data.search.tracks} />
      </div>
      <Artists artists={data.search.artists} />
      <Albums albums={data.search.albums} />
    </>
  )
}

export default ResultContainer
