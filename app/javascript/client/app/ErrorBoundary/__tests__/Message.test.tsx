import React from 'react'
import { shallow } from 'enzyme'
import { Text } from 'react-native'
import snapshot from 'enzyme-to-json'
import Message, { IMessageProps } from '../Message'

it('renders correctly', () => {
  const props : IMessageProps = {
    error: new Error('Bom bom bommm!'),
    onRestart: jest.fn()
  }
  const component = shallow((
    <Message {...props}>
      <Text>Inner content</Text>
    </Message>
  ))
  expect(snapshot(component)).toMatchSnapshot()
})