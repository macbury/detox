import DeviceInfo from 'react-native-device-info'

export default function getDeviceName() : Promise<String> {
  return DeviceInfo.getDeviceName()
}