export const parseDate = (
  dateString: string,
): {
  year: number
  month: number
  date: number
} => {
  const [year, month, date] = dateString.split('-').map(Number)

  return { year, month, date }
}

export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const getTimeAgo = (dateString: string): string => {
  const inputDate = new Date(dateString)
  const currentDate = new Date()

  const diffInMs = currentDate.getTime() - inputDate.getTime()

  const millisecondsPerMinute = 1000 * 60
  const millisecondsPerHour = millisecondsPerMinute * 60
  const millisecondsPerDay = millisecondsPerHour * 24
  const millisecondsPerWeek = millisecondsPerDay * 7

  if (diffInMs >= millisecondsPerWeek) {
    const weeksAgo = Math.floor(diffInMs / millisecondsPerWeek)
    return `${weeksAgo} ${weeksAgo > 1 ? 'weeks' : 'week'} ago`
  }
  if (diffInMs >= millisecondsPerDay) {
    const daysAgo = Math.floor(diffInMs / millisecondsPerDay)
    return `${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago`
  }
  if (diffInMs >= millisecondsPerHour) {
    const hoursAgo = Math.floor(diffInMs / millisecondsPerHour)
    return `${hoursAgo} ${hoursAgo > 1 ? 'hours' : 'hour'} ago`
  }
  const minutesAgo = Math.floor(diffInMs / millisecondsPerMinute)
  return `${minutesAgo} ${minutesAgo > 1 ? 'minutes' : 'minute'} ago`
}
