import { GET_STORIES_QUERY } from '../getStories'

it('should match query', () => {
  expect(GET_STORIES_QUERY).toMatchGraphqlSchema()
})