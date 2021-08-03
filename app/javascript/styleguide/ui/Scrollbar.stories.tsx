import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import Scrollbar from './Scrollbar'

const Container = styled.View`
  min-height: 8000px;
`

export default {
  title: 'UI/Scrollbar',
  component: Scrollbar
} as Meta<any>;

const Template: Story<any> = (args) => {
  return (
    <Container>
      <Scrollbar {...args} />
    </Container>
  )
};

export const Example = Template.bind({})
