import { Platform, PlatformOSType } from 'react-native'

export type ServerType = PlatformOSType | "server"

const isServerRender = typeof window === "undefined"

const OS : ServerType = isServerRender ? 'server' : Platform.OS

export default OS