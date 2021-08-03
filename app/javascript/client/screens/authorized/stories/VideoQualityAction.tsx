import React, { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Stream } from '@detox/api'
import Menu from '@detox/styleguide/Menu'
import MenuButton from '@detox/styleguide/Menu/MenuButton'
import ActionButton from '@detox/styleguide/Header/ActionButton'

export interface IVideoQualityActionProp {
  streams: Stream[]
  selectedStream: Stream

  changeStream(nextSteam: Stream)
}

export default function VideoQualityAction({ streams, selectedStream, changeStream } : IVideoQualityActionProp) {
  const { t } = useTranslation()
  const [menuVisible, setMenuVisible] = useState(false)

  const toggleMenu = useCallback(() => setMenuVisible((v) => !v), [setMenuVisible])
  const hideMenu = useCallback(() => setMenuVisible(false), [setMenuVisible])
  const items = useMemo(() => streams.map((stream) => {
    const handleChangeStream = () => {
      changeStream(stream)
      hideMenu()
    }

    return (
      <MenuButton
        icon={selectedStream === stream ? "checkbox-marked" : "checkbox-blank-outline"} 
        key={stream.quality}
        onPress={handleChangeStream}>
          {stream.quality}
      </MenuButton>
    )
  }), [selectedStream, streams])

  if (streams.length === 0) {
    return null
  }

  return (
    <Menu visible={menuVisible} onCloseMenu={hideMenu} anchor={<ActionButton color="#fff" onPress={toggleMenu} icon="quality-high" />}>
      {items}
    </Menu>
  )
}