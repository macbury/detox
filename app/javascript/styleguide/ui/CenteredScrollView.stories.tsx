import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import CenteredScrollView from './CenteredScrollView'
import Text from '../form/Text';

export default {
  title: 'UI/CenteredScrollView',
  component: CenteredScrollView
} as Meta<any>;

const Template: Story<any> = (args) => {
  return (
    <CenteredScrollView>
      <Text>This content should be centered</Text>
    </CenteredScrollView>
  )
};

export const Example = Template.bind({})

Example.args = {
}