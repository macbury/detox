import { GET_ALL_CHANNELS } from '../getChannels'

it('should match query', () => {
  expect(GET_ALL_CHANNELS).toMatchGraphqlSchema()
})