'use client'

import { match, P } from 'ts-pattern'
import { Quiz } from '@/entities/quiz'
import { CurrentTrack, CurrentTrackSkeleton } from '@/entities/track'
import type { GetQueueQuery } from '@/shared/graphql'

type CurrentPlayingTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>

const NowPlayingPanel = ({ loading, track }: TProps) => {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-y-scroll px-3 pb-3 scrollbar-hide">
      {match({ loading, track })
        .with({ loading: true }, () => <CurrentTrackSkeleton />)
        .with({ track: P.nullish }, () => <CurrentTrackSkeleton />)
        .with(
          {
            track: {
              id: P.string,
              lyrics: { available: P.boolean },
            },
          },
          ({ track }) => (
            <>
              <CurrentTrack track={track} />
              {match(track.lyrics)
                .with({ available: true }, () => <Quiz trackId={track.id!} />)
                .otherwise(() => null)}
            </>
          ),
        )
        .otherwise(() => (
          <CurrentTrackSkeleton />
        ))}
    </div>
  )
}

export { NowPlayingPanel }

type TProps = {
  track?: CurrentPlayingTrack
  loading: boolean
}
