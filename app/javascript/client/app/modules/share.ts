import { NativeModules } from 'react-native'

const { MyShareModule } = NativeModules

interface IShareModule {
  shareUrl(url : string)
}

const ShareLib = MyShareModule as IShareModule

/**
 * Open share window on android
 */
export default async function shareUrl(url : string) {
  ShareLib?.shareUrl(url)
}