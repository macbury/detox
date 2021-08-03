import React from 'react'
import styled from 'styled-components/native'

const TopBar = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: ${({ theme }) => theme.insets?.top || 0}px;
  background: ${({ theme }) => theme.colors.navigationBar};
  z-index: 1000;
`

export default TopBar