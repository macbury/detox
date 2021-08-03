import { UPDATE_CHANNEL_MUTATION } from '../updateChannel'

it('should match query', () => {
  expect(UPDATE_CHANNEL_MUTATION).toMatchGraphqlSchema()
})