import { GET_VIDEO_QUERY } from '../getVideo'

it('should match query', () => {
  expect(GET_VIDEO_QUERY).toMatchGraphqlSchema()
})