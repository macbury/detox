import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { IBlurhashProps } from './types'
import Blurhash from './index'

export default {
  title: 'UI/Blurhash',
  component: Blurhash,
} as Meta<IBlurhashProps>;

const Template: Story<IBlurhashProps> = (args) => {
  return <Blurhash {...args} />
};

export const Example = Template.bind({});

Example.args = {
  hash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
  width: 300,
  height: 200,
  visible: true
}