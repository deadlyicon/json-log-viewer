import * as React from 'react'
import { promptToUpload } from './Logs'
import LogsList from './LogsList'
import './App.sass'

export default function App(){
  return <div className="App">
    <div className="App-Banner">
      JSON Log Viewer
    </div>
    <div className="App-Controls">
      <button
        className="UploadLogsButton"
        onClick={promptToUpload}
      >upload logs</button>
    </div>
    <div className="App-LogsList">
      <LogsList {...{
        // filters, sort etc
      }}/>
    </div>
    <div className="App-Footer">
      created by - Jared Grippe
    </div>
  </div>
}

