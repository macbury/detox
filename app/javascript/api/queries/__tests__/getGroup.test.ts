import { GET_GROUP } from '../getGroup'

it('should match query', () => {
  expect(GET_GROUP).toMatchGraphqlSchema()
})