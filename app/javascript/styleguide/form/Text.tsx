import React from 'react'
import styled from 'styled-components/native'

const Text = styled.Text`
  font-family: ${({ theme }) => theme.font.main};
  font-size: ${({ theme }) => theme.fontSize.text};
  color: ${({ theme }) => theme.colors.text};
`

export const Paragraph = styled(Text)`
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 12px;
`

export const Header1 = styled(Text)`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 10px;
`

export const Header2 = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const Header3 = styled(Text)`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const Header4 = styled(Text)`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const FormHeader = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 15px;
  margin-top: 20px;
`

export default Text