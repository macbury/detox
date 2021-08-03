import { useCallback, useRef } from 'react'

export default function useDebounceCallback(callback, deps : Array<any>, timeout : number) {
  const handler = useRef<any>()

  return useCallback((args) => {
    if (handler.current) {
      clearTimeout(handler.current)
    }

    handler.current = setTimeout(() => {
      callback(args)  
    }, timeout)
    
  }, [...deps, handler])
}