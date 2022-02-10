import { createPubSub } from './helpers'

const LOGS_IN_MEMORY = new Set()

let keySeq = 0
function addLogEntry(entry){
  LOGS_IN_MEMORY.add({...entry, __key: keySeq++ })
  useLogs.pubDeferred()
}
// const writableStream = new WritableStream({
//   write(chunk){
//     console.log('LOGS WS', chunk.toString())
//   },
//   close(){
//     console.log('LOGS WS close')
//   },
//   abort(error){
//     console.log('LOGS WS abort', error)
//   },
// })


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
  for (const json of lines){
    const [parseError, entry] = safeJSONparse(json)
    addLogEntry(entry)
  }
}

function safeJSONparse(json){
  try{ return [undefined, JSON.parse(json)] }
  catch(error){ return [error]}
}

export function useLogs(){
  useLogs.useSub()
  const logs = [...LOGS_IN_MEMORY]
  return logs
}
Object.assign(useLogs, createPubSub())
