import { GET_JOB_SUMMARY } from '../getJob'

it('should match query', () => {
  expect(GET_JOB_SUMMARY).toMatchGraphqlSchema()
})