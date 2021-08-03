import { NativeModules } from 'react-native';
import { TGeneratedKeyType, formatAsPem } from './types';
const { JwtModule } = NativeModules

interface IJwtModule {
  generateKey() : Promise<any>
}

export default async function generateKey() : Promise<TGeneratedKeyType> {
  const module = JwtModule as IJwtModule
  const keys = await module.generateKey()

  const result = {
    publicKey: formatAsPem(keys.publicKey),
    privateKey: keys.privateKey
  }

  return result
}