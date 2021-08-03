import React from 'react'
import { FlatList } from 'react-native'
import { Story, Meta } from '@storybook/react/types-6-0';
import RefreshControl, { IRefreshControlProps } from './RefreshControl'
import styled from 'styled-components/native'
import { renderCenteredScroll } from '../ui/CenteredScrollView';

const ExampleItem = styled.Text`
  padding: 20px 10px;
`

export default {
  title: 'Feed/RefreshControl',
  component: RefreshControl
} as Meta<IRefreshControlProps>;

const Template: Story<IRefreshControlProps> = (args) => {
  return (
    <FlatList
      refreshControl={<RefreshControl {...args} />}
      renderScrollComponent={renderCenteredScroll}
      renderItem={({ index }) => <ExampleItem>Item {index}</ExampleItem>}
      keyExtractor={(value, index) => index}
      data={(new Array(100).fill(1))}
    />
  )
};

export const Example = Template.bind({});

Example.args = {
  newStoriesCount: 10
}