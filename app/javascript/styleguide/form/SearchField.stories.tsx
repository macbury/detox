import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import SearchField, { ISearchFieldProps } from './SearchField'

export default {
  title: 'Form/SearchField',
  component: SearchField
} as Meta<ISearchFieldProps>;

const Template: Story<ISearchFieldProps> = (args) => {
  return <SearchField {...args} />
};

export const Basic = Template.bind({});

Basic.args = {
  
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true
};