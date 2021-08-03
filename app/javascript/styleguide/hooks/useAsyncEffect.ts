import { useLayoutEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Platform } from 'react-native'
interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void
}

export type TAsyncEffectCallback = (...args : any[]) => CancellablePromise<any>

/**
 * Run this effect Promise is cancelled on unmount
 * @param functionToInvoke
 * @param deps
 */
export function useAsyncEffect(functionToInvoke : TAsyncEffectCallback, deps = []) {
  useLayoutEffect(() => {
    const promise = functionToInvoke()
    return () => promise.cancel()
  }, [functionToInvoke, ...deps])
}

/**
 * Run this effect if screen is focused. Promise is cancelled on unmount
 * @param functionToInvoke
 * @param deps
 */
export function useAsyncEffectOnFocus(functionToInvoke : TAsyncEffectCallback, deps = []) {
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    if (isFocused) {
      const promise = functionToInvoke()

      return () => {
        if (promise?.cancel) {
          promise.cancel()
        }
      }
    }
  }, [functionToInvoke, isFocused, ...deps])
}