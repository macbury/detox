import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import ThemeSelector, { IThemeSelectorProps } from './ThemeSelector'

export default {
  title: 'Drawer/ThemeSelector',
  component: ThemeSelector
} as Meta<IThemeSelectorProps>;

const Template: Story<IThemeSelectorProps> = (args) => {
  return <ThemeSelector {...args} />
};

export const Example = Template.bind({});

Example.args = {} as IThemeSelectorProps
