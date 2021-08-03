import { TMediaChangeEvent } from "@detox/store/AV/Driver"
import { updatePlaybackMutation } from "@detox/api/mutations/updatePlayback";
import { DiskStorage } from "@detox/store/storage/disk";
import { MemoryStorage, RootStore } from "@detox/store";
import SessionStore from "@detox/store/SessionStore";
import createApiClient from "@detox/api";

/**
 * Prepare api client
 * TODO: move this to be used in other places
 * @returns 
 */
async function getApi() {
  const storage = new DiskStorage()
  const cookies = new MemoryStorage()
  const parent = {
    root: {
      storage,
      cookies
    }
  } as any

  await storage.load()

  const session = new SessionStore(parent)
  const api = createApiClient(session)
  session.setup()

  return api
}

/**
 * This sends current playback position to backend server
 * @param taskData 
 */
async function SyncPlaybackService({ id, position, isPlaying, updatedAt } : TMediaChangeEvent) {
  console.log('Started SyncPlaybackService')
  const api = await getApi()

  const result = await updatePlaybackMutation(api, {
    id, position, isPlaying
  })
  console.log('SyncPlaybackService', result)
}

export {}
module.exports = SyncPlaybackService