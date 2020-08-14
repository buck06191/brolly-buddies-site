import { parseISO, format } from 'date-fns'
import * as React from 'react'

const Date: React.FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd LLLL, yyyy')}</time>
}

export default Date
