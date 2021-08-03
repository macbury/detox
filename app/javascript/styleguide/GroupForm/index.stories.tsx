import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import GroupForm, { IGroupFormProps } from './index'
import { DetailsForm } from './DetailsForm'

export default {
  title: 'Group/Form',
  component: GroupForm
} as Meta<IGroupFormProps>;


const Template: Story<IGroupFormProps> = (args) => {
  const options = [...Array(78).keys()].map((index) => (
    { id: `index:${index}`,  selected: index % 2 == 0, channel: { name: `test: ${index}`, icon: 'https://odysee.com/public/favicon.png' }  }
  ))
  return (
    <GroupForm {...args}
      DetailsForm={() => <DetailsForm />}
      options={options as any} />
  )
};

export const Example = Template.bind({});

Example.args = {
  name: 'Hello world',
  icon: 'bank'
};