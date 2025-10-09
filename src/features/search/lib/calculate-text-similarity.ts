const calculateLevenshteinDistance = (a: string, b: string): number => {
  // Initialize the matrix
  const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => {
      if (i === 0) return j
      if (j === 0) return i
      return 0
    }),
  )

  // Fill the matrix with distances
  for (let i = 1; i <= a.length; i += 1)
    for (let j = 1; j <= b.length; j += 1)
      if (a[i - 1] === b[j - 1]) matrix[i][j] = matrix[i - 1][j - 1]
      else
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1

  return matrix[a.length][b.length]
}

export const calculateTextSimilarity = (
  text: string,
  target: string,
): number => {
  const textProcessed = text.toLowerCase().replace(/\s+/g, '')
  const targetProcessed = decodeURIComponent(target.toLowerCase()).replace(
    /\s+/g,
    '',
  )

  if (textProcessed === '' || targetProcessed === '') return 0
  if (textProcessed === targetProcessed) return 1 // Exact match

  const distance = calculateLevenshteinDistance(textProcessed, targetProcessed)
  const maxLength = Math.max(textProcessed.length, targetProcessed.length)

  return maxLength === 0 ? 0 : 1 - distance / maxLength
}
