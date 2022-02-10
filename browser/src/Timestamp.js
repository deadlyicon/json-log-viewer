import * as React from 'react'
import './LogsList.sass'

export default function Timestamp({ at }){
  return <span
    className="Timestamp"
    title={at}
  >{`${at}`}</span>
}
