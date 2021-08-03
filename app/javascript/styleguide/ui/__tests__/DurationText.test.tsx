import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import DurationText from '../DurationText'

it('renders 00:10:00', () => {
  const component = shallow(<DurationText>{600000}</DurationText>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders 01:10:00', () => {
  const component = shallow(<DurationText>{6600000}</DurationText>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders 00:00:05', () => {
  const component = shallow(<DurationText>{5000}</DurationText>)
  expect(snapshot(component)).toMatchSnapshot()
})