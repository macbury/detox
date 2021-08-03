import React from 'react'
import InformationContent from '../ui/InformationContent'
import LoadingContent from '../ui/LoadingContent'

export interface IEmptyContentOrLoadingProps {
  loading?: boolean
}

export default function EmptyContentOrLoading({ loading } : IEmptyContentOrLoadingProps) {
  if (loading) {
    return <LoadingContent />
  } else {
    return <InformationContent message="screens.home.feed.empty" icon="view-dashboard" />
  }
}