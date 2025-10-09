'use client'

import { useQuery } from '@apollo/client/react'
import { useEffect, useMemo } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { match } from 'ts-pattern'
import { GET_QUEUE, usePlaybackStore } from '@/features/play-track'
import type { GetQueueQuery } from '@/shared/graphql'
import { Tooltip, useLayoutStore } from '@/shared/ui'
import { DevicePanel } from '@/widgets/rightpanel-device'
import { NowPlayingPanel } from '@/widgets/rightpanel-nowplaying'
import { QueuePanel } from '@/widgets/rightpanel-queue'

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
        <div className="flex h-full flex-col">
          <SidebarHeader
            title={currentlyPlaying?.album?.name ?? 'Select the track'}
          />
          <NowPlayingPanel track={currentlyPlaying} loading={loading} />
        </div>
      ))
      .with('QUEUE', () => (
        <div className="flex h-full flex-col">
          <SidebarHeader title="Queue" />
          <QueuePanel
            currentlyPlaying={currentlyPlaying}
            queue={queue}
            loading={loading}
          />
        </div>
      ))
      .with('DEVICE', () => (
        <>
          <SidebarHeader title="Connect to a device" />
          <DevicePanel />
        </>
      ))
      .otherwise(() => null)
  }

  return (
    <div className="h-full rounded-lg bg-gray-700 scrollbar-hide">
      {renderContent()}
    </div>
  )
}

export default DefaultSidebar

const SidebarHeader = ({ title }: { title: string }) => {
  const { setRightPanelState } = useLayoutStore()

  return (
    <div className="flex items-center justify-between px-4 py-5">
      <p className="font-bold">{title}</p>
      <Tooltip label="Close" spacing={10}>
        <button
          onClick={() => setRightPanelState(null)}
          aria-label="close right panel"
        >
          <LiaTimesSolid size="1.3rem" />
        </button>
      </Tooltip>
    </div>
  )
}
