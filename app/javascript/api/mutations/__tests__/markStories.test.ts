import { MARK_STORIES_MUTATION } from '../markStories'

it('should match query', () => {
  expect(MARK_STORIES_MUTATION).toMatchGraphqlSchema()
})