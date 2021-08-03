import React from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Text from '../form/Text'

export interface IAccountContainerProps {
  username: string
  backendUrl: string
}

function calculateContainerHeight() {
  if (Platform.OS === "web") {
    return 110
  } else {
    return 90
  }
}

const Container = styled.View`
  min-height: ${calculateContainerHeight}px;
  background: transparent;
  justify-content: flex-end;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 10px;
`

const Username = styled(Text)`
  font-weight: bold;
  font-size: 24px;
  padding: 15px 25px 0px 25px;
  text-align: left;
`

const BackendUrl = styled(Text)`
  font-size: 12px;
  padding: 0px 25px 15px 25px;
  text-align: left;
  opacity: 0.9;
`

export default function AccountContainer({ username, backendUrl } : IAccountContainerProps) {
  return (
    <Container>
      <Username>{username}</Username>
      <BackendUrl>{backendUrl}</BackendUrl>
    </Container>
  )
}