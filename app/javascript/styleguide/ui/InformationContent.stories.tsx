import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import InformationContent, { IInformationContentProps } from './InformationContent'

export default {
  title: 'UI/InformationContent',
  component: InformationContent
} as Meta<IInformationContentProps>;

const Template: Story<IInformationContentProps> = (args) => {
  return <InformationContent {...args} />
};

export const Example = Template.bind({})

Example.args = {
  message: 'Here is your information',
  icon: 'meteor'
}