import { SUBSCRIBE_MUTATION } from '../subscribe'

it('should match query', () => {
  expect(SUBSCRIBE_MUTATION).toMatchGraphqlSchema()
})