import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import Text from '../form/Text'
import Card, { ICardProps } from './index'
import Header, { HeaderTitle, HeaderContent, HeaderSubTitle, HeaderAction } from './Header'

export default {
  title: 'Card/Container',
  component: Card
} as Meta<ICardProps>;

const Container = styled.View`
  padding: 10px 20px;
`

export const Example: Story<ICardProps> = (args) => {
  return (
    <Card {...args}>
      <Container>
        <Text>Hello world</Text>
      </Container>
    </Card>
  )
};

Example.args = {
  shadow: 2
}

export const WithHeaderAction: Story<ICardProps> = (args) => {
  return (
    <Card {...args}>
      <Header>
        <HeaderContent>
          <HeaderTitle>Header</HeaderTitle>
          <HeaderSubTitle>Subtitle</HeaderSubTitle>
        </HeaderContent>
        <HeaderAction name="dots-vertical" onPress={() => null} />
      </Header>
      <Container>
        <Text>Hello world</Text>
      </Container>
    </Card>
  )
};

WithHeaderAction.args = {
  shadow: 2
}