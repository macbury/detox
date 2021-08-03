import { NativeModules } from 'react-native';
import { TGeneratedKeyType, formatAsPem } from './types';
const { JwtModule } = NativeModules

interface IJwtModule {
  generateAccessToken(privateKey : string, sessionId : string) : Promise<string>
}

export default async function generateAccessToken(privateKey : any, sessionId : string) {
  const accessToken = await (JwtModule as IJwtModule).generateAccessToken(privateKey, sessionId)
  return accessToken
}