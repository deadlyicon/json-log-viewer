import * as React from 'react'
import { List } from 'react-virtualized'

import { useLogs } from './Logs'
import LogLevel from './LogLevel'
import Timestamp from './Timestamp'
import './LogsList.sass'

export default function LogsList({ windowScroll }){
  // TODO re-render on window resize
  const logsInMemory = useLogs()
  const logs = [...logsInMemory]
    .sort(sortBy({}))
  return <div className="LogsList">
    <div>showing {logsInMemory.size} lines</div>
    <List {...{
      height: innerHeight,
      width: innerWidth,
      rowCount: logsInMemory.size,
      scrollToIndex: logs.length - 1,
      rowHeight: 20,
      rowRenderer: row => <Entry {...row} entry={logs[row.index]}/>,
    }}/>
    <div></div>
  </div>
}

function Entry(props){
  const { index, style, entry } = props
  return <div className="LogsList-Entry" {...{style}}>
    <div className="LogsList-Entry-buttons">
      <button onClick={()=>{ console.log(entry) }}>🎮</button>
      <button onClick={()=>{ copyToClipboard(entry) }}>📋</button>
    </div>
    <Timestamp at={entry.timestamp}/>
    <LogLevel level={entry.level}/>
    <div className="LogsList-Entry-json">{JSON.stringify(entry)}</div>
  </div>
}

function sortBy({}){
  return function(a, b){
    a = a.timestamp
    b = b.timestamp
    return a < b ? -1 : a > b ? 1 : 0
  }
}
