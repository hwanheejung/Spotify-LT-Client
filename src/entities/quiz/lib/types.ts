type LevelIdNameMap = {
  0: 'Easy'
  1: 'Medium'
  2: 'Hard'
}

export type LevelId = keyof LevelIdNameMap // 0 | 1 | 2
export type LevelName = LevelIdNameMap[LevelId] // 'Easy' | 'Medium' | 'Hard'

export type Level = {
  description: string
} & (
  | { id: 0; name: 'Easy' }
  | { id: 1; name: 'Medium' }
  | { id: 2; name: 'Hard' }
)

export const levels: Level[] = [
  {
    id: 0,
    name: 'Easy',
    description: 'Only some words are blanked out.',
  },
  {
    id: 1,
    name: 'Medium',
    description: 'More blanks to challenge your skills.',
  },
  {
    id: 2,
    name: 'Hard',
    description: 'All words are blanked out. No hints provided.',
  },
]

export type Status = 'PLAYING' | 'NOT_PLAYING'
