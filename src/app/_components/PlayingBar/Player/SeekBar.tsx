'use client'

import { debounce } from 'lodash'
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePlaybackStore } from '@/lib/stores/playback.store'
import { formatDuration } from '@/shared/lib/time'

const SeekBar = () => {
  const { player, currentTrack } = usePlaybackStore()
  const [position, setPosition] = useState(0)
  const duration = currentTrack?.duration || 0

  useEffect(() => {
    if (currentTrack?.position !== undefined) setPosition(currentTrack.position)
  }, [currentTrack?.position])

  const debouncedSeek = useMemo(
    () =>
      debounce((newPosition: number) => {
        if (player) player.seek(newPosition)
      }, 300),
    [player],
  )

  useEffect(() => {
    return () => {
      debouncedSeek.cancel()
    }
  }, [debouncedSeek])

  const handleSeek = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newPosition = parseInt(event.target.value, 10)
      setPosition(newPosition)
      debouncedSeek(newPosition)
    },
    [debouncedSeek],
  )

  const formattedPosition = useMemo(() => formatDuration(position), [position])
  const formattedDuration = useMemo(() => formatDuration(duration), [duration])
  const isDisabled = !player || !currentTrack

  const sliderClass = `range-slider h-1.5 flex-1 cursor-pointer appearance-none rounded-md bg-gray-300 ${
    isDisabled ? 'opacity-90' : ''
  }`

  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-right text-xxs text-gray-200">
        {formattedPosition}
      </span>
      <input
        type="range"
        min="0"
        max={duration}
        value={position}
        onChange={handleSeek}
        disabled={isDisabled}
        className={sliderClass}
        aria-label="Seek position"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={position}
        aria-disabled={isDisabled}
        style={
          {
            '--progress': `${
              duration === 0 ? 0 : (position / duration) * 100
            }%`,
          } as React.CSSProperties
        }
      />
      <span className="w-8 text-xxs text-gray-200">{formattedDuration}</span>
    </div>
  )
}

export default SeekBar
