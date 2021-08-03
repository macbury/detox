import { SIGN_IN_MUTATION } from '../signIn'

it('should match query', () => {
  expect(SIGN_IN_MUTATION).toMatchGraphqlSchema()
})