import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import NotFoundOrLoading, { INotFoundOrLoadingProps } from './NotFoundOrLoading'

export default {
  title: 'UI/NotFoundOrLoading',
  component: NotFoundOrLoading
} as Meta<INotFoundOrLoadingProps>;

const Template: Story<INotFoundOrLoadingProps> = (args) => {
  return <NotFoundOrLoading {...args} />
};

export const Example = Template.bind({})

Example.args = {
  icon: 'plus'
}