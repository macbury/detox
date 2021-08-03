// import SignJWT from 'jose/jwt/sign'
import { JWT_ALG, ALGO_OPTS } from './generateKey'

export default async function generateAccessToken(privateKey : any, sessionId : string) {
  const key = await crypto.subtle.importKey('jwk', privateKey, ALGO_OPTS, false, ['sign'])
  const { SignJWT } = await import(/* webpackChunkName: "jose" */ 'jose/jwt/sign')

  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: JWT_ALG })
    .setAudience('*')
    .setIssuer(sessionId)
    .setExpirationTime('1m')
    .sign(key)

  return jwt
}