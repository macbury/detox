import { UPDATE_PLAYBACK_STATE_MUTATION } from '../updatePlayback'

it('should match mutation', () => {
  expect(UPDATE_PLAYBACK_STATE_MUTATION).toMatchGraphqlSchema()
})