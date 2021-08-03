import React, { useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import SearchField from '@detox/styleguide/form/SearchField'
import { useStoreData } from '@detox/store'

const HeaderContainer = styled.View`
  align-self: center;
  max-width: ${({ theme }) => theme.device === 'desktop' ? '900px' : '100%'};
  width: 100%;
`

const AdaptiveSearchField = styled(SearchField)`
  margin-left: ${({ theme }) => theme.device === 'desktop' ? '60px' : '0px'};
`

function useDiscoveryChannelStore() {
  return useStoreData(({ screens: { discoveryChannel } }) => ({
    query: discoveryChannel.query,
    isLoading: discoveryChannel.isLoading,
    
    focus: discoveryChannel.focus,
    blur: discoveryChannel.blur,
    setQuery: discoveryChannel.setQuery
  }))
}

export function DiscoverChannelsHeader() {
  const { t } = useTranslation()
  const {
    query,
    isLoading,

    setQuery,
    focus,
    blur
  } = useDiscoveryChannelStore()

  return (
    <HeaderContainer>
      <AdaptiveSearchField
        value={query}
        onFocusChange={(focused) => focused ? focus() : blur()}
        loading={isLoading}
        placeholder={t('screens.home.discovery_channel.header.placeholder')}
        onChangeText={setQuery} />
    </HeaderContainer>
  )
}