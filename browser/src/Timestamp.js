import * as React from 'react'
import './LogsList.sass'

export default function Timestamp({ at }){
  const string = new Date(at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',

    // timeZone: 'utc'
  })
  return <span
    className="Timestamp"
    title={at}
  >{`${string}`}</span>
}
