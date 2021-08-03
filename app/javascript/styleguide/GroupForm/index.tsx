import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { renderCenteredScroll } from '../ui/CenteredScrollView'
import { DETAILS_HEIGHT } from './DetailsForm'
import { useRenderSubscriptionItem } from './SubscriptionItem'
import { IGroupFormProps } from './types'

export { DetailsForm } from './DetailsForm'
export type { IGroupFormProps }

const Footer = styled.View`
  height: ${({ theme }) => theme.device === 'desktop' ? '70px' : '100px'};
`

export default function GroupForm({ editable, options, DetailsForm } : IGroupFormProps) {
  const theme = useTheme()
  const numColumns = theme.device === "mobile" ? 3 : 5
  const renderSubscriptionItem = useRenderSubscriptionItem(editable)
  const renderHeader = useCallback(() => <DetailsForm />, [DetailsForm])

  return (
    <FlatList
      key={numColumns}
      removeClippedSubviews={false} 
      ListHeaderComponentStyle={{ height: DETAILS_HEIGHT }}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={() => <Footer />}
      renderItem={renderSubscriptionItem}
      renderScrollComponent={renderCenteredScroll}
      keyExtractor={({ id }) => id}
      initialNumToRender={50}
      numColumns={numColumns}
      data={options} />
  )
}