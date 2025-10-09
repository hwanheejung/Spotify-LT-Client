'use client'

import { useQuery } from '@apollo/client/react'
import { useEffect, useMemo } from 'react'
import { match } from 'ts-pattern'
import { GET_QUEUE, usePlaybackStore } from '@/features/play-track'
import type { GetQueueQuery } from '@/shared/graphql'
import { useLayoutStore } from '@/shared/ui'
import Device from './_components/Device'
import { NowPlaying } from './_components/NowPlaying'
import Queue from './_components/Queue'

type CurrentTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['currentTrack']
>
type QueueTrack = NonNullable<
  NonNullable<GetQueueQuery['player']>['queue'][number]
>

const DefaultSidebar = () => {
  const { rightPanelState } = useLayoutStore()
  const { isActive, currentTrack } = usePlaybackStore()

  const { data, loading, refetch } = useQuery<GetQueueQuery>(GET_QUEUE, {
    skip: !isActive,
  })

  const currentlyPlaying = useMemo<CurrentTrack | undefined>(() => {
    const track = data?.player?.currentTrack
    return track ?? undefined
  }, [data])

  const queue = useMemo<QueueTrack[] | undefined>(() => {
    const queueData = data?.player?.queue
    if (!queueData) return undefined
    return queueData.filter((track): track is QueueTrack => track !== null)
  }, [data])

  useEffect(() => {
    if (currentTrack && currentlyPlaying?.id !== currentTrack.id) refetch()
  }, [currentTrack, currentlyPlaying, refetch])

  if (!rightPanelState) return null

  const renderContent = () => {
    return match(rightPanelState)
      .with('NOW_PLAYING', () => (
        <NowPlaying track={currentlyPlaying} loading={loading} />
      ))
      .with('QUEUE', () => (
        <Queue
          currentlyPlaying={currentlyPlaying}
          queue={queue}
          loading={loading}
        />
      ))
      .with('DEVICE', () => <Device />)
      .otherwise(() => null)
  }

  return (
    <div className="h-full rounded-lg bg-gray-700 scrollbar-hide">
      {renderContent()}
    </div>
  )
}

export default DefaultSidebar
