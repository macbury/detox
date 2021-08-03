import { UPDATE_GROUP_MUTATION } from '../updateGroup'

it('should match mutation', () => {
  expect(UPDATE_GROUP_MUTATION).toMatchGraphqlSchema()
})