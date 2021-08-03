import { GET_STORY_QUERY } from '../getStory'

it('should match query', () => {
  expect(GET_STORY_QUERY).toMatchGraphqlSchema()
})