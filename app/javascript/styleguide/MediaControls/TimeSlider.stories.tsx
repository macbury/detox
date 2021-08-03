import React from 'react'
import { actions } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import TimeSlider, { ITimeSliderProps } from './TimeSlider'

const Container = styled.View`
  width: 480px;
  height: 320px;
`

export default {
  title: 'Media Controls/Time Slider',
  component: TimeSlider
} as Meta<ITimeSliderProps>;

const Template: Story<ITimeSliderProps> = (args) => {
  const sliderActions = actions('pauseAsync', 'playFromPositionAsync', 'setPositionAsync')

  return (
    <Container>
      <TimeSlider {...sliderActions} {...args} />
    </Container>
  )
};

export const Example = Template.bind({})


Example.args = {
  volume: 0,
  accent: 'rgb(51, 153, 102)'
}