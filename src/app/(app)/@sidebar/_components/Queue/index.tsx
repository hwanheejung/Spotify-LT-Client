'use client'

import { match, P } from 'ts-pattern'
import { FlatList } from '@/components/flatlist'
import type { GetQueueQuery } from '@/shared/__graphql-generated__/dto'
import Header from '../Header'
import Track from './Track'
import TrackSkeleton from './Track.skeleton'

type CurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>
type QueueTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['queue'][number]
>

interface QueueProps {
  currentlyPlaying?: CurrentTrack
  queue?: QueueTrack[]
  loading: boolean
}

const QueueLoading = () => (
  <div>
    <Header title="Queue" />
    <div className="flex-1 px-3 pt-3">
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
    </div>
  </div>
)

const NoQueue = () => (
  <div>
    <Header title="Queue" />
    <div className="flex items-center justify-center p-10 text-gray-200">
      No tracks in queue
    </div>
  </div>
)

const Queue = ({ currentlyPlaying, queue, loading }: QueueProps) => {
  return match({ loading, currentlyPlaying, queue })
    .with({ loading: true }, () => <QueueLoading />)
    .with({ currentlyPlaying: P.nullish }, () => <QueueLoading />)
    .with({ queue: P.nullish }, () => <QueueLoading />)
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
          (track): track is QueueTrack => track !== null,
        )

        return (
          <div className="flex h-full flex-col">
            <Header title="Queue" />
            <div className="flex-1 overflow-y-scroll px-3 pb-10 pt-3 scrollbar-hide">
              <h2 className="font-bold">Now playing</h2>
              <Track track={currentlyPlaying} />

              {match(validQueue)
                .with(
                  P.when((q) => q.length > 0),
                  (tracks) => (
                    <>
                      <h2 className="mt-4 font-bold">Next</h2>
                      <FlatList
                        data={tracks}
                        renderItem={(track) => <Track track={track} />}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                      />
                    </>
                  ),
                )
                .otherwise(() => (
                  <div className="mt-4 text-gray-200">No upcoming tracks</div>
                ))}
            </div>
          </div>
        )
      },
    )
    .otherwise(() => <NoQueue />)
}

export default Queue
