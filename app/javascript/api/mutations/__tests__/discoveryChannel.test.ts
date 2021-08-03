import { DISCOVERY_CHANNEL_MUTATION } from '../discoverChannel'

it('should match query', () => {
  expect(DISCOVERY_CHANNEL_MUTATION).toMatchGraphqlSchema()
})