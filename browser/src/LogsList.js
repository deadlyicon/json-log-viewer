import * as React from 'react'

import { useLogs } from './Logs'
import './LogsList.sass'

export default function LogsList(props){
  const logs = useLogs()
  return <>
    {logs.map(entry =>
      <Entry {...{key: entry.__key, entry}}/>
    )}
  </>
}

function Entry({ entry }){
  return <div/>
}
