'use client'

import { match, P } from 'ts-pattern'
import { Quiz } from '@/entities/quiz'
import type { GetQueueQuery } from '@/shared/graphql'
import Header from '../Header'
import { CurrentTrack, CurrentTrackSkeleton } from './CurrentTrack'

type CurrentPlayingTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>

const NowPlaying = ({ loading, track }: TProps) => {
  const headerTitle = match(track)
    .with(
      {
        album: { name: P.string },
      },
      (track) => track.album!.name!,
    )
    .otherwise(() => 'Select the track')

  return (
    <div className="flex h-full flex-col">
      <Header title={headerTitle} />
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
    </div>
  )
}

export { NowPlaying }

type TProps = {
  track?: CurrentPlayingTrack
  loading: boolean
}
