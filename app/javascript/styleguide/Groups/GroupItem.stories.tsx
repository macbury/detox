import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, text } from '@storybook/addon-knobs';
import { TUrlProps } from '@detox/shared'
import GroupItem, { IGroupItemProps } from './GroupItem'

export default {
  title: 'Group/GroupItem',
  component: GroupItem,
  decorators: [withKnobs],
} as Meta<IGroupItemProps>;

const Template: Story<IGroupItemProps> = (args) => {
  const groupPath : TUrlProps = {
    routeName: 'ShowGroup'
  }

  const group = {
    icon: text('Icon name', 'bank'),
    name: text('Group name', 'Example group'),
    id: 'abc'
  }

  const props : any = { groupPath, group }

  return <GroupItem {...props} />
};

export const Example = Template.bind({});
