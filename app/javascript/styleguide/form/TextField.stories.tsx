import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import TextField, { ITextFieldProps } from './TextField'

export default {
  title: 'Form/TextField',
  component: TextField
} as Meta<ITextFieldProps>;

const Template: Story<ITextFieldProps> = (args) => {
  return <TextField {...args} />
};

export const Basic = Template.bind({});

Basic.args = {
  label: 'Example input',
  placeholder: 'Input value',
  editable: true
};

export const Password = Template.bind({});

Password.args = {
  label: 'Password',
  placeholder: 'type password here',
  editable: true,
  secureTextEntry: true
};

export const WithError = Template.bind({});

WithError.args = {
  label: 'Example input',
  placeholder: 'type password here',
  editable: true,
  error: 'oh no some error here'
};