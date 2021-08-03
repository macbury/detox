import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Tabs, { ITabsProps } from './Tabs'
import Tab from './Tab';
import Header, { IHeaderProps } from './index'

export default {
  title: 'Header/Tabs',
  component: Tabs
} as Meta<ITabsProps>;

const Template: Story<ITabsProps> = (args) => {
  return (
    <Tabs {...args}>
      <Tab onPress={() => null} focused={true} focusedIcon="earth" unfocusedIcon="earth-outline" />
      <Tab onPress={() => null} focusedIcon="newspaper" unfocusedIcon="newspaper-outline" />
      <Tab onPress={() => null} focusedIcon="videocam" unfocusedIcon="videocam-outline" />
      <Tab onPress={() => null} focusedIcon="musical-notes" unfocusedIcon="musical-notes-outline" />
      <Tab onPress={() => null} focusedIcon="image" unfocusedIcon="image-outline" />
    </Tabs>
  )
};

export const Basic = Template.bind({});

const HeaderTemplate: Story<ITabsProps> = (args) => {
  const HeaderTitle = (props) => (
    <Tabs {...args}>
      <Tab onPress={() => null} bubble={10} focused={true} focusedIcon="earth" unfocusedIcon="earth-outline" />
      <Tab onPress={() => null} focusedIcon="newspaper" unfocusedIcon="newspaper-outline" />
      <Tab onPress={() => null} focusedIcon="videocam" unfocusedIcon="videocam-outline" />
      <Tab onPress={() => null} focusedIcon="musical-notes" unfocusedIcon="musical-notes-outline" />
      <Tab onPress={() => null} focusedIcon="image" unfocusedIcon="image-outline" />
    </Tabs>
  )

  return (
    <Header headerTitle={HeaderTitle} />
  )
};

export const InHeader = HeaderTemplate.bind({});

const BackgroundJobsTemplate: Story<ITabsProps> = (args) => {
  const HeaderTitle = (props) => (
    <Tabs {...args}>
      <Tab onPress={() => null} bubble={10} focused={true} focusedIcon="cube" unfocusedIcon="cube-outline" />
      <Tab onPress={() => null} bubble={33} focusedIcon="file-tray-full" unfocusedIcon="file-tray-full-outline" />
      <Tab onPress={() => null} bubble={2700} focusedIcon="flame" unfocusedIcon="flame-outline" />
    </Tabs>
  )

  return (
    <Header headerTitle={HeaderTitle} />
  )
};

export const BackgroundJobs = BackgroundJobsTemplate.bind({});