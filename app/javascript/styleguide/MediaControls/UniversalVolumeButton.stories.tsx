import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import VolumeButton, { IVolumeButtonProps } from './UniversalVolumeButton'

const Container = styled.View`
  width: 480px;
  height: 320px;
`

export default {
  title: 'Media Controls/Volume Button',
  component: VolumeButton
} as Meta<IVolumeButtonProps>;

const Template: Story<IVolumeButtonProps> = (args) => {
  return (
    <Container>
      <VolumeButton {...args} />
    </Container>
  )
};

export const Example = Template.bind({})

Example.args = {
  volume: 0,
  setVolume: console.log,
  accent: 'rgb(51, 153, 102)'
}