import React from 'react'
import Head from 'next/head'
import styled from 'styled-components/native'
import Text from '@detox/styleguide/form/Text'

export const HEADER_HEIGHT = 64

const HeaderContainer = styled.View`
  height: ${HEADER_HEIGHT}px;
  background: ${({ theme }) => theme.colors.card};
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: 1px;
  box-shadow: 0px 0px 1px ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: center;
`

const HeaderTitle = styled(Text)`
  font-weight: 500;
  font-size: 18px;
`

const HeaderTitleContainer = styled.View<IHeaderProps>`
  flex: 1;
  justify-content: center;
  padding-left: ${({ headerLeft }) => headerLeft ? '0px' : '25px' };
`

const HeaderLeft = styled.View`
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: row;
`

const HeaderRight = styled.View`
  align-items: flex-end;
  justify-content: center;
`

export interface IHeaderProps {
  title?: string
  headerTitle?: (props) => JSX.Element
  headerLeft?: (props) => JSX.Element,
  headerRight?: (props) => JSX.Element
}

export default function Header({ title, headerLeft, headerTitle, headerRight, ...props } : IHeaderProps) {
  return (
    <HeaderContainer>
      {headerLeft && <HeaderLeft>
        {headerLeft(props)}
      </HeaderLeft>}
      <HeaderTitleContainer headerLeft={headerLeft}>
        {headerTitle ? headerTitle(props) : <HeaderTitle>{title}</HeaderTitle>}
      </HeaderTitleContainer>
      <HeaderRight>
        {headerRight && headerRight(props)}
      </HeaderRight>
    </HeaderContainer>
  )
}