import { useLayoutEffect, useState } from 'react';

export function useIsFocused() {
  const [isFocused, setFocused] = useState(false)

  useLayoutEffect(() => {
    setFocused(true)
    return () => setFocused(false)
  })

  return isFocused
}