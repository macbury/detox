import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { IButtonProps } from './Button'

export default {
  title: 'Form/Button',
  component: Button
} as Meta<IButtonProps>;

// add support for theme https://github.com/echoulen/storybook-addon-styled-component-theme
// or better https://storybook.js.org/docs/react/writing-stories/decorators
const Template: Story<IButtonProps> = (args) => {
  return <Button {...args} />
};

export const Primary = Template.bind({});

Primary.args = {
  title: 'Hello world',
};

export const Outline = Template.bind({});

Outline.args = {
  title: 'Hello world',
  outline: true
};