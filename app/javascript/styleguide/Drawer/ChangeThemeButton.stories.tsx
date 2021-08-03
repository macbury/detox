import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ChangeThemeButton, { IChangeThemeButtonProps } from './ChangeThemeButton'

export default {
  title: 'Drawer/ChangeThemeButton',
  component: ChangeThemeButton
} as Meta<IChangeThemeButtonProps>;

const Template: Story<IChangeThemeButtonProps> = (args) => {
  return <ChangeThemeButton {...args} />
};

export const Light = Template.bind({});

Light.args = {
  themeName: 'light'
} as IChangeThemeButtonProps

export const Dark = Template.bind({});

Dark.args = {
  themeName: 'dark'
} as IChangeThemeButtonProps