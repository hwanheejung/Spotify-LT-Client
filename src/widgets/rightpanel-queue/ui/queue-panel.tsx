'use client'

import { match, P } from 'ts-pattern'
import { QueueTrack, QueueTrackSkeleton } from '@/entities/track'
import type { GetQueueQuery } from '@/shared/graphql'
import { FlatList } from '@/shared/ui'

const QueuePanel = ({ currentlyPlaying, queue, loading }: TProps) => {
  return match({ loading, currentlyPlaying, queue })
    .with({ loading: true }, () => <QueueSkeleton />)
    .with({ currentlyPlaying: P.nullish }, () => <QueueSkeleton />)
    .with({ queue: P.nullish }, () => <QueueSkeleton />)
    .with(
      {
        currentlyPlaying: {
          id: P.string,
          name: P.string,
        },
        queue: P.when((q) => Array.isArray(q)),
      },
      ({ currentlyPlaying, queue }) => {
        const validQueue = queue.filter(
          (track): track is TQueueTrack => track !== null,
        )

        return (
          <div className="flex-1 overflow-y-scroll px-3 pb-10 pt-3 scrollbar-hide">
            <h2 className="font-bold">Now playing</h2>
            <QueueTrack track={currentlyPlaying} />

            {match(validQueue)
              .with(
                P.when((q) => q.length > 0),
                (tracks) => (
                  <>
                    <h2 className="mt-4 font-bold">Next</h2>
                    <FlatList
                      data={tracks}
                      renderItem={(track) => <QueueTrack track={track} />}
                      keyExtractor={(item, index) => `${item.id}-${index}`}
                    />
                  </>
                ),
              )
              .otherwise(() => (
                <div className="mt-4 text-gray-200">No upcoming tracks</div>
              ))}
          </div>
        )
      },
    )
    .otherwise(() => <NoQueue />)
}

export { QueuePanel }

const QueueSkeleton = () => (
  <div className="flex-1 px-3 pt-3">
    <QueueTrackSkeleton />
    <QueueTrackSkeleton />
    <QueueTrackSkeleton />
  </div>
)

const NoQueue = () => (
  <div className="flex items-center justify-center p-10 text-gray-200">
    No tracks in queue
  </div>
)

type TProps = {
  currentlyPlaying?: TCurrentTrack
  queue?: TQueueTrack[]
  loading: boolean
}

type TCurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>

type TQueueTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['queue'][number]
>
