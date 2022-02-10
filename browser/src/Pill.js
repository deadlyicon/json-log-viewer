import * as React from 'react'
import './Pill.sass'

export default function Pill({ children, color, className = '' }){
  return <span
    className={`Pill Pill-${color} ${className}`}
  >{children}</span>
}
