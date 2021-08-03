import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(relativeTime)
dayjs.extend(isToday)

/**
 * Dayjs instance with configured plugins
 */
export default dayjs

export const PUBLISHED_AT_FORMAT = 'MMMM D YYYY, H:mm'