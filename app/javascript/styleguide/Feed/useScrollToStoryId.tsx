import React, { useLayoutEffect, useState } from 'react'
import { Story } from '@detox/api'
import { FlatList } from 'react-native'

export default function useScrollToStoryId(compact : boolean, stories : Story[], selectedStoryId : string, flatListRef : React.MutableRefObject<FlatList>) {
  const [alreadyScrolled, setAlreadyScrolled] = useState(false)

  useLayoutEffect(() => {
    if (!flatListRef.current) {
      return
    }

    if (selectedStoryId && !alreadyScrolled) {
      const index = stories.findIndex(({ id })  => selectedStoryId == id)
      //console.log(`Scroll to index ${index} for ${selectedStoryId}`, stories.map(({ id }) => (id)))
      if (index >= 0) {
        setAlreadyScrolled(true)
        flatListRef.current.scrollToIndex({
          index,
          animated: false
        })
      }
    }

    if (!compact) {
      setAlreadyScrolled(false)
    }
  }, [flatListRef.current, selectedStoryId, stories, alreadyScrolled])
}