import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Header, { IHeaderProps } from './index'
import BackOrBurger from './BackOrBurger';
import BackButton from './BackButton';
import ActionButton from './ActionButton';

export default {
  title: 'Header',
  component: Header
} as Meta<IHeaderProps>;

const Template: Story<IHeaderProps> = (args) => {
  return <Header {...args} />
};

export const Basic = Template.bind({});

Basic.args = {
  title: 'Header title'
};

export const BasicWithBurger = Template.bind({});

BasicWithBurger.args = {
  title: 'Burger on left',
  headerLeft: (props) => <BackOrBurger />
};

export const BasicForScreen = Template.bind({});

BasicForScreen.args = {
  title: 'Other example',
  headerLeft: (props) => <BackButton />,
  headerRight: (props) => <ActionButton icon="plus" onPress={() => null} />
};
