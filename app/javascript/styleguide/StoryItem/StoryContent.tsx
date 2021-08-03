import React from 'react'
import styled from 'styled-components/native'
import Text from '../form/Text'

const CardContent = styled.View`
  padding: 16px;
  padding-top: 0px;
  flex-direction: row;
`

const CardContentText = styled(Text)`
  line-height: 19px;
  flex-wrap: wrap;
`

export interface IStoryContentProps {
  content: string
}

export default function StoryContent({ content } : IStoryContentProps) {
  if (content === null || content.length === 0) {
    return null
  }

  return (
    <CardContent>
      <CardContentText>{content}</CardContentText>
    </CardContent>
  )
}