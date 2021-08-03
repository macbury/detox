import { REFRESH_ALL_MUTATION } from '../refreshFeeds'

it('should match query', () => {
  expect(REFRESH_ALL_MUTATION).toMatchGraphqlSchema()
})