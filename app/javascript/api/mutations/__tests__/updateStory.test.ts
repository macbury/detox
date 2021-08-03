import { UPDATE_STORY_MUTATION } from '../updateStory'

it('should match query', () => {
  expect(UPDATE_STORY_MUTATION).toMatchGraphqlSchema()
})