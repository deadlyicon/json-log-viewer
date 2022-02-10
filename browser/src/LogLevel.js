import * as React from 'react'
import './LogsList.sass'

export default function LogLevel({ level }){
  return <span
    className={`LogLevel LogLevel-${level}`}
  >{level}</span>
}
