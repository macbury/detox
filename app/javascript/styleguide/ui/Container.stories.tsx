import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Container from './Container'
import Text from '../form/Text';

export default {
  title: 'UI/Container',
  component: Container
} as Meta<any>;

const Template: Story<any> = (args) => {
  return (
    <Container>
      <Text>This content should not be centered</Text>
    </Container>
  )
};

export const Example = Template.bind({})

Example.args = {
}