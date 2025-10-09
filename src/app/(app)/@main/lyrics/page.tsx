import { GET_LYRICS } from '@/features/play-track'
import { PreloadQuery } from '@/shared/graphql/apollo-client'
import { TrackLyrics } from '@/widgets/track-lyrics'

const LyricsPage = () => {
  return (
    <PreloadQuery query={GET_LYRICS}>
      <TrackLyrics />
    </PreloadQuery>
  )
}

export default LyricsPage
