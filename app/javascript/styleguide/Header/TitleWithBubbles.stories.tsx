import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import TitleWithBubbles, { ITitleWithBubblesProps } from './TitleWithBubbles'

export default {
  title: 'Header/TitleWithBubbles',
  component: TitleWithBubbles
} as Meta<ITitleWithBubblesProps>;

const Template: Story<ITitleWithBubblesProps> = (args) => {
  return <TitleWithBubbles {...args} />
};

export const WithBubble = Template.bind({});

WithBubble.args = {
  bubble: 30,
  children: 'Title'
};


export const WithBubbleBigNumber = Template.bind({});

WithBubbleBigNumber.args = {
  bubble: 99999,
  children: 'Title'
};

export const WithoutBubble = Template.bind({});

WithoutBubble.args = {
  children: 'Title'
};
