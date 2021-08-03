import React from 'react'
import InformationContent from './InformationContent'
import LoadingContent from './LoadingContent'

export interface INotFoundOrLoadingProps {
  loading?: boolean
}

export default function NotFoundOrLoading({ loading } : INotFoundOrLoadingProps) {
  if (loading) {
    return <LoadingContent />
  } else {
    return (
      <InformationContent
        message="not_found"
        icon="compass-off-outline" />
    )
  }
}