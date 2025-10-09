import { useEffect, useRef } from 'react'
import { usePlaybackStore } from '@/lib/stores/playback.store'

const SyncedLyrics = ({ lyrics }: TProps) => {
  const currentTime = usePlaybackStore((state) => state.currentTrack?.position)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const parsedLyrics: TSyncedLine[] = lyrics
    .split('\n')
    .map((line: string) => {
      const [time, text] = line.split(']')

      if (!text || !time) return null

      // [mm:ss.ms] -> ms
      const timestamp =
        time
          .replace('[', '')
          .split(':')
          .reduce<number>((acc, val) => acc * 60 + parseFloat(val), 0) *
          1000 -
        1000

      return {
        time: Math.round(timestamp),
        text: text.trim(),
      }
    })
    .filter(Boolean) as TSyncedLine[]

  useEffect(() => {
    if (!currentTime) return

    const currentLineIndex = parsedLyrics.findIndex(
      (line, index) =>
        currentTime >= line.time &&
        (index === parsedLyrics.length - 1 ||
          currentTime < parsedLyrics[index + 1].time),
    )

    if (currentLineIndex !== -1 && lineRefs.current[currentLineIndex])
      lineRefs.current[currentLineIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }, [currentTime, parsedLyrics])

  return (
    <div className="h-full overflow-y-scroll px-10 py-20 scrollbar-hide">
      <div className="whitespace-pre-line text-xl font-bold text-gray-100 filter">
        {parsedLyrics.map((line, index) => (
          <p
            key={`${line.time}-${index}`}
            ref={(el) => {
              lineRefs.current[index] = el
            }}
            className={`${
              currentTime &&
              currentTime >= line.time &&
              (
                index === parsedLyrics.length - 1 ||
                  currentTime < parsedLyrics[index + 1].time
              )
                ? 'text-gray-0'
                : ''
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
      <span className="block pt-10 text-xs text-gray-200">
        Lyrics provided by LRCLIB
      </span>
    </div>
  )
}

export { SyncedLyrics }

type TProps = {
  lyrics: string
}

type TSyncedLine = {
  time: number // ms
  text: string
}
