import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import EmptyContentOrLoading, { IEmptyContentOrLoadingProps } from './EmptyContentOrLoading'

export default {
  title: 'Feed/EmptyContentOrLoading',
  component: EmptyContentOrLoading
} as Meta<IEmptyContentOrLoadingProps>;

const Template: Story<IEmptyContentOrLoadingProps> = (args) => {
  return <EmptyContentOrLoading {...args} />
};

export const Example = Template.bind({});

Example.args = {
  loading: true
}