import RootStore from "../RootStore"
import { ACCESS_TOKEN_KEY_NAME, AuthMode } from '../SessionStore';
import { MemoryStorage } from "../storage/memory"
import { CookiesStorage } from "../storage/cookies"

export function getSsrApiEndpoint() {
  return process.env['LOCAL_API_HOST']
}

export interface IWithSsrOpts {
  authRequired?: boolean
}

/**
 * Get access token from header or from cookie
 * @param headers 
 */
function getAccessToken(headers = {}, cookies) : string {
  if (headers[ACCESS_TOKEN_KEY_NAME]) {
    return headers[ACCESS_TOKEN_KEY_NAME]
  } else {
    return cookies.get(ACCESS_TOKEN_KEY_NAME)
  }
}

/**
 * Use this helper for initializing store logic on backend and pass state back user(mainly use in ssr)
 * @param callback 
 */
export async function withSsrStore(req, callback: (store: RootStore) => Promise<any>, opts : IWithSsrOpts = {}) {
  const cookies = new MemoryStorage()
  console.log('Received cookies: ', req.headers['cookie'])
  cookies.hydrate(await CookiesStorage.fetchHydration(req.headers['cookie']))
  const storage = new MemoryStorage()
  const store = new RootStore(storage, cookies)

  console.log('Got', getSsrApiEndpoint())
  store.sessions.instanceUrl = getSsrApiEndpoint()
  console.log(`Instance url is: ${store.sessions.instanceUrl}`)
  store.sessions.authMode = AuthMode.AccessToken
  store.sessions.authKey = getAccessToken(req.headers, cookies)
  await store.settings.restore()

  try {
    if (opts.authRequired) {
      if (!store.sessions.isLoggedIn) {
        console.log('User not logged in!')
        return {
          props: {}
        }
      }
    }

    const processed = callback ? await callback(store) : true
    
    if (processed) {
      return {
        props: {
          initialMobxProps: storage.toBundle(),
          initialCookiesProps: cookies.toBundle()
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } catch (internalError) {
    return {
      props: {
        internalError
      }
    }
  }
}