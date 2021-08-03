import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ErrorMessageContent, { IErrorMessageContentProps } from './ErrorMessageContent'

export default {
  title: 'UI/ErrorMessageContent',
  component: ErrorMessageContent
} as Meta<IErrorMessageContentProps>;

const Template: Story<IErrorMessageContentProps> = (args) => {
  return <ErrorMessageContent {...args} />
};

export const Example = Template.bind({})

Example.args = {
  message: 'Message content',
  index: 2
}