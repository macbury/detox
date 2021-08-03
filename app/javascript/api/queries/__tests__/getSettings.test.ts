import { GET_SETTINGS } from '../getSettings'

it('should match query', () => {
  expect(GET_SETTINGS).toMatchGraphqlSchema()
})