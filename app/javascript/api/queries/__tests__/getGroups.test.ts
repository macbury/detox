import { GET_GROUPS } from '../getGroups'

it('should match query', () => {
  expect(GET_GROUPS).toMatchGraphqlSchema()
})