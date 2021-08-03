import SignJWT from 'jose/jwt/sign'
import { calculateThumbprint } from 'jose/jwk/thumbprint'
import { createPrivateKey } from 'crypto'
import { generateKeyPair } from 'jose/util/generate_key_pair'
import fromKeyLike from 'jose/jwk/from_key_like'

/**
 * Client sign in step
 * generate key
 * send public to user
 */

it('generate test', async () => {
  const alg = 'ES256'
  const { publicKey, privateKey } = await generateKeyPair(alg)
  
  const publicPem = publicKey.export({ type: 'spki', format: 'pem' })
  console.log('publicKey', publicPem)
  const thumbprint = await calculateThumbprint(await fromKeyLike(publicKey))
  console.log('thumbprint', thumbprint)

  const privatePem = privateKey.export({ type: 'sec1', format: 'pem' })
  console.log('privateKey', privatePem)

  const loadedPrivKey = createPrivateKey(privatePem)

  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg })
    .setAudience('*')
    .setIssuer('28bf131f-0000-0000-0000-35e9293919e1')
    .setExpirationTime('10m')
    .sign(loadedPrivKey)
  console.log('jwt', jwt)

  /**
   * signIn
   *   - username
   *   - password
   *   - publicKey
   */
})