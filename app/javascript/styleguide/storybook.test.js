import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';
import initI18n from '@detox/api/i18n'

beforeAll(async () => {
  await initI18n()
})

initStoryshots({
  test: multiSnapshotWithOptions({}),
});
