import { GET_CURRENT_USER_QUERY } from '../getCurrentUser'

it('should match query', () => {
  expect(GET_CURRENT_USER_QUERY).toMatchGraphqlSchema()
})