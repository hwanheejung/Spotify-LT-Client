import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useQuizStore } from '@/entities/quiz'
import { type Level, type LevelId, levels } from '@/types/quiz.types'

const Quiz = ({ trackId }: { trackId: string }) => {
  const [levelId, setLevelId] = useState<LevelId>(0)
  const router = useRouter()
  const { setTrackId, setLevel, setStatus } = useQuizStore()

  const handleStart = () => {
    setTrackId(trackId)
    setLevel(levelId)
    setStatus('PLAYING')
    router.push(`/quiz/${trackId}?level=${levelId}`)
  }

  return (
    <div className="flex flex-col gap-3 rounded-md bg-gray-400 p-3">
      <h3 className="font-bold">Fill in the blank quiz!</h3>

      <div className="flex flex-col gap-2">
        {levels.map((lvl) => (
          <LevelButton
            key={lvl.name}
            level={lvl}
            setLevel={setLevelId}
            currentLevelId={levelId}
          />
        ))}
      </div>

      <button
        onClick={handleStart}
        className="rounded-md bg-spotifyGreen px-4 py-2 font-bold text-gray-900 transition-all hover:scale-105 focus:outline-none"
      >
        Start
      </button>
    </div>
  )
}

export { Quiz }

const LevelButton = ({
  currentLevelId,
  level,
  setLevel,
}: TLevelButtonProps) => {
  return (
    <button
      onClick={() => setLevel(level.id)}
      className="flex items-center justify-between gap-1"
    >
      <div className="flex flex-1 flex-col items-start text-start">
        <span className="">{level.name}</span>
        <p className="text-xs text-gray-100">{level.description}</p>
      </div>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          currentLevelId === level.id
            ? 'border-spotifyGreen'
            : 'border-gray-300'
        } `}
      >
        <div
          className={`h-2 w-2 rounded-full ${
            currentLevelId === level.id && 'bg-spotifyGreen'
          }`}
        />
      </div>
    </button>
  )
}

type TLevelButtonProps = {
  currentLevelId: LevelId
  level: Level
  setLevel: (level: LevelId) => void
}
