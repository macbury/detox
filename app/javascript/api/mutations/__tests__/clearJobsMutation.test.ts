import { CLEAR_JOBS_MUTATION } from '../clearJobs'

it('should match mutation', () => {
  expect(CLEAR_JOBS_MUTATION).toMatchGraphqlSchema()
})