import { GET_JOBS_SUMMARY } from '../getJobsSummary'

it('should match query', () => {
  expect(GET_JOBS_SUMMARY).toMatchGraphqlSchema()
})