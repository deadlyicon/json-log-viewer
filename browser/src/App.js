import * as React from 'react'
import { useState } from 'react'

import { promptToUpload } from './Logs'
import LogsList from './LogsList'
import './App.sass'

export default function App(){
  const [filter, setFilter] = useState('')

  return <div className="App">
    <div className="App-Banner">
      JSON Log Viewer
    </div>
    <div className="App-Controls">
      <input {...{
        type: 'text',
        value: filter,
        onChange: e => { setFilter(e.target.value) },
      }}/>
      <button
        className="UploadLogsButton"
        onClick={promptToUpload}
      >upload logs</button>
    </div>
    <div className="App-LogsList">
      <LogsList {...{ filter }}/>
    </div>
    <div className="App-Footer">
      created by - Jared Grippe
    </div>
  </div>
}

