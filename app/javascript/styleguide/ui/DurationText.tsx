import React, { useMemo } from 'react'
import Text from '../form/Text'

/**
 * Format the time from seconds to M:SS.
 * @param  {Number} secs Seconds to format.
 * @return {String}      Formatted time.
 */
function formatTime(secs : any) {
  let secNum = parseInt(secs, 10) // don't forget the second param
  let hours : any = Math.floor(secNum / 3600)
  let minutes : any = Math.floor((secNum - (hours * 3600)) / 60)
  let seconds : any = secNum - (hours * 3600) - (minutes * 60)

  if (hours < 10) {
    hours = "0"+hours
  }
  if (minutes < 10) {
    minutes = "0"+minutes
  }
  if (seconds < 10) {
    seconds = "0"+seconds
  }

  if (hours === '00') {
    return minutes + ':' + seconds
  } else {
    return hours + ':' + minutes + ':' + seconds
  }
}

export interface IDurationTextProps {
  children: React.ReactNode
}

export default function DurationText({ children, ...props } : IDurationTextProps) {
  const time = useMemo(() => {
    if (children >= 0) {
      return formatTime(children as number / 1000)
    } else {
      return '--:--'
    }
  }, [children])

  return <Text {...props}>{time}</Text>
}