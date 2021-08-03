import { GET_UPDATED_STORIES_QUERY } from '../getUpdatedStories'

it('should match query', () => {
  expect(GET_UPDATED_STORIES_QUERY).toMatchGraphqlSchema()
})