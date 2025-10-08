'use client'

import { useQuery } from '@apollo/client/react'
import { useMemo } from 'react'
import { GET_LYRICS } from '@/lib/queries/player.query'
import type { Lyrics as LyricsType } from '@/types/player.types'
import Locked from './_components/Locked'
import Lyrics from './_components/Lyrics'
import NoData from './_components/NoData'
import SyncedLyrics from './_components/SyncedLyrics'

const LyricsPage = () => {
  const { data, loading } = useQuery(GET_LYRICS)

  const lyrics: LyricsType = useMemo(
    () => data?.player?.currentTrack?.lyrics,
    [data],
  )

  if (!lyrics?.available || loading) return <NoData />
  if (lyrics.locked) return <Locked />

  return lyrics.data.syncedLyrics ? (
    <SyncedLyrics lyrics={lyrics.data.syncedLyrics} />
  ) : (
    <Lyrics lyrics={lyrics.data.plainLyrics} />
  )
}

export default LyricsPage
