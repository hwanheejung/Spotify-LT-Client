import { Suspense } from 'react'
import { GET_LYRICS } from '@/features/play-track'
import { PreloadQuery } from '@/shared/graphql/apollo-client'
import { TrackLyrics } from '@/widgets/track-lyrics'

const LyricsPage = () => {
  return (
    <PreloadQuery query={GET_LYRICS}>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackLyrics />
      </Suspense>
    </PreloadQuery>
  )
}

export default LyricsPage
