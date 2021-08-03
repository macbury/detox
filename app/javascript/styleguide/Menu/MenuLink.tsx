import React from 'react'
import { Link } from '@react-navigation/native'
import styled from 'styled-components/native'

const MenuLink = styled(Link)`
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 400;
  line-height: 24px;
  font-family: ${({ theme }) => theme.font.main};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.buttonText};
`

export default MenuLink