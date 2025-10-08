import { Quiz } from '@/entities/quiz'
import type { CurrentlyPlayingDTO } from '@/shared/api'
import Header from '../Header'
import { CurrentTrack, CurrentTrackSkeleton } from './CurrentTrack'

const NowPlaying = ({ loading, track }: TProps) => {
  return (
    <div className="flex h-full flex-col">
      <Header title={track ? track.album.name : 'Select the track'} />
      <div className="flex flex-1 flex-col gap-5 overflow-y-scroll px-3 pb-3 scrollbar-hide">
        {loading || !track ? (
          <CurrentTrackSkeleton />
        ) : (
          <>
            <CurrentTrack track={track} />
            {track.lyrics.available && <Quiz trackId={track.id} />}
          </>
        )}
      </div>
    </div>
  )
}

export { NowPlaying }

type TProps = {
  track?: CurrentlyPlayingDTO
  loading: boolean
}
