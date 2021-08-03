import { useState, useCallback, useEffect } from "react"

const HidePlayerAfterSeconds = 5

export default function useShowControls(isPlaying: boolean) {
  const [mouseTimeout, setMouseTimeout] = useState<number>(HidePlayerAfterSeconds)
  const [visible, setVisible] = useState<boolean>(true)

  const showControls = useCallback(() => setMouseTimeout(HidePlayerAfterSeconds), [setMouseTimeout])

  const toggleControls = useCallback(() => {
    setMouseTimeout((currentTimeout) => {
      if (currentTimeout > 0) {
        return 0
      } else {
        return HidePlayerAfterSeconds
      }
    })
  }, [setMouseTimeout])

  useEffect(() => {
    if (isPlaying) {
      setMouseTimeout(HidePlayerAfterSeconds)
    }
  }, [isPlaying, setMouseTimeout])

  useEffect(() => {
    const handler = setInterval(() => {
      setMouseTimeout((timeout) => {
        if (timeout > 0)
          return timeout - 1
        return 0;
      })
    }, 1000)

    return () => clearTimeout(handler)
  }, [setMouseTimeout])

  useEffect(() => {
    setVisible(!isPlaying || mouseTimeout > 0)
  }, [isPlaying, mouseTimeout])

  return {
    visible,
    toggleControls,
    showControls
  }
}