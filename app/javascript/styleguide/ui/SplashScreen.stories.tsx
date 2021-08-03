import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import styled from 'styled-components/native'
import SplashScreen, { ISplashScreenProps } from './SplashScreen'

const Container = styled.View`
  min-height: 1080px;
`

export default {
  title: 'UI/SplashScreen',
  component: SplashScreen
} as Meta<ISplashScreenProps>;

const Template: Story<ISplashScreenProps> = (args) => {
  return (
    <Container>
      <SplashScreen {...args}>
        <p>content below!</p>
      </SplashScreen>
    </Container>
  )
};

export const Example = Template.bind({})
