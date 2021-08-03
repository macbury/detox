import { CREATE_GROUP_MUTATION } from '../createGroup'

it('should match mutation', () => {
  expect(CREATE_GROUP_MUTATION).toMatchGraphqlSchema()
})