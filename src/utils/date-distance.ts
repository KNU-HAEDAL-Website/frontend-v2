import { getDateDistance, kstFormat } from '@toss/date'

export default function formatDateDistanceFromToday(date: Date) {
  const today = new Date()
  const distance = getDateDistance(date, today)

  const seconds = distance.seconds
  const minutes = distance.minutes
  const days = distance.days

  if (days > 1) {
    return date.toLocaleDateString()
  }

  if (days > 0) return `${days}일 전`

  if (minutes > 0) return kstFormat(date, 'HH:mm')

  if (seconds > 0) return seconds === 1 ? '방금 전' : `${seconds}초 전`

  return '방금 전'
}
