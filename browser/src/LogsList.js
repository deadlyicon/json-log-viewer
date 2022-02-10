import * as React from 'react'
import { useState } from 'react'
import { List } from 'react-virtualized'

import { useLogs } from './Logs'
import Pill from './Pill'
import LogLevel from './LogLevel'
import Timestamp from './Timestamp'
import './LogsList.sass'

export default function LogsList({ filter }){
  // TODO re-render on window resize
  const [selectedEntry, setSelectedEntry] = useState()
  console.log({ selectedEntry })

  const logsInMemory = useLogs()
  const logs = [...logsInMemory]
    .filter(([key, parseError, entry, json]) =>
      !filter || json.includes(filter)
    )
    .sort(sortBy({}))

  const selectRow = entry => {
    setSelectedEntry(entry)
  }
  return <div className="LogsList">
    <div>showing {logs.length}/{logsInMemory.size} lines</div>
    <List {...{
      height: innerHeight - 100,
      width: innerWidth,
      // width: 99999,
      rowCount: logs.length,
      scrollToIndex: logs.length - 1,
      rowHeight: 25,
      rowRenderer: row => {
        const [uuid, parseError, entry, json] = logs[row.index]
        return <Entry {...{
          ...row, uuid, parseError, entry, json, selectRow
        }}/>
      },
    }}/>
    {selectedEntry && <SelectedEntry entry={selectedEntry}/>}
  </div>
}

function Entry(props){
  const { index, style, entry, selectRow } = props
  return <div {...{
    className: 'LogsList-Entry',
    style,
    onClick: event => {
      if (event.target.tagName === 'BUTTON') return
      selectRow(entry)
    },
  }}>
    <div className="LogsList-Entry-buttons">
      <button onClick={()=>{ console.log(entry) }}>🎮</button>
      <button onClick={()=>{ copyToClipboard(entry) }}>📋</button>
    </div>
    <Pill color="grey" className="LogsList-Entry-timestamp">
      <Timestamp at={entry.timestamp}/>
    </Pill>
    <Pill
      color={LOG_LEVEL_COLORS[entry.level]}
      className="LogsList-Entry-logLevel"
    >
      <LogLevel level={entry.level}/>
    </Pill>
    <Pill color="grey" className="LogsList-Entry-app">
      {entry.app}
    </Pill>
    <Pill color="grey" className="LogsList-Entry-trace">
      {entry.trace}
    </Pill>
    {/* <div className="LogsList-Entry-context">
      {JSON.stringify(entry.context)}
    </div> */}
    <div className="LogsList-Entry-message">
      {JSON.stringify(entry.message)}
    </div>
    {/* app */}
    {/* context */}
    {/* message */}
    <div className="LogsList-Entry-json">{JSON.stringify(entry)}</div>
  </div>
}

const LOG_LEVEL_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'grey',
  http: 'grey',
  verbose: 'grey',
  debug: 'grey',
  silly: 'salmon',
}

function sortBy({}){
  return function(a, b){
    a = a.timestamp
    b = b.timestamp
    return a < b ? -1 : a > b ? 1 : 0
  }
}


function SelectedEntry({ entry }){
  return <div className="LogsList-SelectedEntry">
    <textarea disabled value={JSON.stringify(entry, null, 2)}/>
  </div>
}
