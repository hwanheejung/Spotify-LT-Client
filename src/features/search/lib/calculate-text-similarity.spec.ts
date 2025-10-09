import { calculateTextSimilarity } from './calculate-text-similarity'

describe('lib/utils/calculateTextSimilarity()', () => {
  it.each([
    // Exact match
    ['billie eilish', 'billie%20eilish', 1],
    ['happier than ever', 'happier%20than%20ever', 1],

    // Partial match
    ['billie', 'billie%20eilish', 1 - 6 / 12],
    ['eilish', 'billie%20eilish', 1 - 6 / 12],
    ['happier', 'happier%20than%20ever', 1 - 8 / 15],

    // // No match
    ['not matching', 'billie%20eilish', 1 - 11 / 12],

    // // Edge cases
    ['', 'billie%20eilish', 0],
    ['billie eilish', '', 0],
    ['', '', 0],
  ])(
    'should calculate similarity between "%s" and "%s" as %d',
    (text, target, expected) => {
      const result = calculateTextSimilarity(text, target)
      expect(result).toBeCloseTo(expected, 5)
    },
  )
})
