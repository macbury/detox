import FeedItem from "@detox/store/models/FeedItem"
import { useRoute } from "@react-navigation/native"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { FlatList } from "react-native"

export default function useParamsStoryId(stories : FeedItem[]) {
  const feedList = useRef<FlatList>()
  const offsetRef = useRef<{ height: number; y: number, percent: number }>({ height: 0, y: 0, percent: 0 })
  const [storyId, setStoryId] = useState<number>(null)
  const { params } = useRoute<any>()
  const sid = params?.storyId ? params?.storyId : null
  const haveStory = !!sid

  //console.log(haveStory ? 'compact offset' : 'full offset', offset)

  const handleScroll = useCallback((height, y) => {
    if (y) {
      offsetRef.current.y = y
    }
    if (height) {
      offsetRef.current.height = height
    }
    offsetRef.current.percent = offsetRef.current.y / offsetRef.current.height
    //console.log(y ? 'handleScroll' : 'handleResize', offsetRef.current)
  }, [offsetRef])

  useLayoutEffect(() => {
    if (!feedList.current) {
      return
    }

    const nextHaveStory = !!sid
    const prevHaveStory = !!storyId

    if (nextHaveStory !== prevHaveStory) {
      const targetId = (sid || '-1')
      const index = stories.findIndex(({ id }) => targetId === id)
      
      try {
        if (index >= 0) {
          console.log('Scroll to index', index)
          feedList.current.scrollToIndex({
            index,
            animated: false
          })
        } else {
          const offset = offsetRef.current.percent * offsetRef.current.height
          console.log('scrollTo', offset)
          feedList.current.scrollToOffset({
            offset,
            animated: false,
          })
        }
      } catch (e) {
        console.error(e)
      }
    }

    setStoryId(sid)
  }, [sid, storyId, feedList.current, offsetRef])

  return useMemo(() => ({
    feedList,
    storyId: sid,
    haveStory,
    handleScroll
  }), [feedList, storyId, haveStory, handleScroll])
}