import { DOWNLOAD_STORY_MUTATION } from '../downloadStory'

it('should match query', () => {
  expect(DOWNLOAD_STORY_MUTATION).toMatchGraphqlSchema()
})