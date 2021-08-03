import React from 'react'
import styled from 'styled-components/native'

const Navbar = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: ${({ theme }) => theme.insets?.bottom || 0}px;
  background: ${({ theme }) => theme.colors.navigationBar};
  z-index: 1000;
`

export default Navbar