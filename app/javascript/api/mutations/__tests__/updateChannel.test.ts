import { REIMPORT_MUTATION } from '../reimportStories'

it('should match query', () => {
  expect(REIMPORT_MUTATION).toMatchGraphqlSchema()
})