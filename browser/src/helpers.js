import { useState, useCallback, useEffect } from 'react'

const noop = () => {}

export function useForceUpdate(){
  let setState = useState()[1]
  useEffect(() => () => { setState = noop }, [])
  return useCallback(() => { setState({}) }, [])
}

export function createPubSub(){
  const subs = new Set()
  let timeout
  function sub(handler){
    subs.add(handler)
    return () => { subs.delete(handler) }
  }
  function pub(){
    subs.forEach(handler => { handler() })
  }
  function pubDeferred(){
    if (timeout) return
    timeout = setTimeout(() => { timeout = undefined; pub() }, 0)
  }
  function useSub(){
    const forceUpdate = useForceUpdate()
    useEffect(
      () => sub(forceUpdate),
      [forceUpdate],
    )
  }
  return { sub, pub, pubDeferred, useSub, subs }
}
export function createSharedState(initialValue){
  let value = typeof initialValue === 'function' ? initialValue() : initialValue
  let subscribers = new Set()
  function updateAll(){
    subscribers.forEach(forceUpdate => { forceUpdate() })
  }
  function setValue(newValue){
    value = newValue
    updateAll()
  }
  function useSharedState(){
    const forceUpdate = useForceUpdate()
    useEffect(
      () => {
        subscribers.add(forceUpdate)
        return () => {
          subscribers.delete(forceUpdate)
        }
      },
      [forceUpdate],
    )
    return [value, setValue]
  }
  useSharedState.get = () => value
  useSharedState.set = setValue
  useSharedState.use = useSharedState
  return useSharedState
}
