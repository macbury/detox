import { useState, useEffect } from 'react'
import dayjs, { PUBLISHED_AT_FORMAT } from '@detox/shared/dayjs'

export function usePublishedAtTime(date : Date | string | dayjs.Dayjs) {
  const [formattedDate, setFormattedDate] = useState('...')

  useEffect(() => {
    const day = dayjs(date)

    if (day.isToday()) {
      setFormattedDate(day.fromNow())

      const timerHandler = setInterval(() => {
        setFormattedDate(day.fromNow())
      }, 60 * 1000)

      return () => clearTimeout(timerHandler)
    } else {
      setFormattedDate(day.format(PUBLISHED_AT_FORMAT))
    }
  }, [date, setFormattedDate])

  return formattedDate
}

export function useDuration(date : Date | string) {
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const day = dayjs(date)

    setDuration(dayjs().diff(day))

    const timerHandler = setInterval(() => {
      setDuration(dayjs().diff(day))
    }, 1000)

    return () => clearTimeout(timerHandler)
  }, [date, setDuration])

  return duration
}