import { UPDATE_SETTING_MUTATION } from '../updateSetting'

it('should match query', () => {
  expect(UPDATE_SETTING_MUTATION).toMatchGraphqlSchema()
})