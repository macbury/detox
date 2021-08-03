import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Header, { HeaderAction, IHeaderActionProps } from './Header'

export default {
  title: 'Card/Header',
  component: Header
} as Meta<IHeaderActionProps>;


const Template: Story<IHeaderActionProps> = (args) => {
  return (
    <Header>
      <HeaderAction {...args} />
    </Header>
  )
};

export const Example = Template.bind({});

Example.args = {
  name: 'plus'
}