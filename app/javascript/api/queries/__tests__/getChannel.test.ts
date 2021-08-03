import { GET_CHANNEL_QUERY } from '../getChannel'

it('should match query', () => {
  expect(GET_CHANNEL_QUERY).toMatchGraphqlSchema()
})