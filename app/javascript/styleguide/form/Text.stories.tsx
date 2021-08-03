import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Text, { Paragraph, Header1, Header2, Header3, Header4, FormHeader } from './Text'

export default {
  title: 'Form/Text',
  component: Text
} as Meta;

export const Basic: Story = (args) => {
  return <Text {...args} />
};

Basic.args = {
  children: 'Simple text'
};

export const ParagraphText: Story = (args) => {
  return <Paragraph {...args} />
};

ParagraphText.args = {
  children: 'Simple paragraph'
};

export const Header1Text: Story = (args) => {
  return <Header1 {...args} />
};

Header1Text.args = {
  children: 'Header1'
};

export const Header2Text: Story = (args) => {
  return <Header2 {...args} />
};

Header2Text.args = {
  children: 'Header2'
};

export const Header3Text: Story = (args) => {
  return <Header3 {...args} />
};

Header3Text.args = {
  children: 'Header3'
};

export const Header4Text: Story = (args) => {
  return <Header4 {...args} />
};

Header4Text.args = {
  children: 'Header4'
};

export const FormHeaderText: Story = (args) => {
  return <FormHeader {...args} />
};

FormHeaderText.args = {
  children: 'Form Header'
};