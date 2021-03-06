import { createPubSub } from './helpers'

const LOGS_IN_MEMORY = new Set()
global.LOGS_IN_MEMORY = LOGS_IN_MEMORY

let keySeq = 0
function addLogEntry(json){
  if (json === '') return
  const [parseError, entry] = safeJSONparse(json)
  LOGS_IN_MEMORY.add([keySeq++, parseError, entry, json])
  useLogs.pubDeferred()
}

export async function promptToUpload(){
  let fileHandles = await showOpenFilePicker({
    types: [
      {
        description: 'logs',
        // accept: {
        //   'log/*': ['.log', '.gif', '.jpeg', '.jpg']
        // }
      },
    ],
    multiple: true,
    excludeAcceptAllOption: false,
  })
  fileHandles = [...fileHandles].filter(fh => fh.kind === 'file')
  for (const fileHandle of fileHandles){
    await verifyPermission(fileHandle)
  }
  const files = await Promise.all(fileHandles.map(fh => fh.getFile()))
  for (const file of files) importLogsFromFile(file)
}

async function verifyPermission(fileHandle, opts = {}) {
  // Check if we already have permission, if so, return true.
  if (await fileHandle.queryPermission(opts) === 'granted') return true
  // Request permission to the file, if the user grants permission, return true.
  if (await fileHandle.requestPermission(opts) === 'granted') return true
  // The user did not grant permission, return false.
  return false
}

function readFileAsText(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = res => {
      resolve(res.target.result)
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsText(file)
  })
}

async function importLogsFromFile(file){
  const text = await readFileAsText(file)
  const lines = text.split("\n")
  for (const line of lines)
    if (line) addLogEntry(line)
}

function safeJSONparse(json){
  try{ return [undefined, JSON.parse(json)] }
  catch(error){ return [error]}
}

export function useLogs(){
  useLogs.useSub()
  return LOGS_IN_MEMORY
}
Object.assign(useLogs, createPubSub())
