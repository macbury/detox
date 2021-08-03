import url from 'url'
import crypto from 'crypto'
import http from 'http'
import https from 'https'

import type { NextApiRequest, NextApiResponse } from 'next'
import { DEFAULT_CONFIGURATION, TWarpPipeConfiguration } from './TWarpPipeConfiguration';

export { DEFAULT_CONFIGURATION }

const COPY_RES_HEADERS = [
  'etag',
  'date',
  'expires', 
  'last-modified', 
  'content-length', 
  'transfer-encoding', 
  'content-encoding', 
  'accept-ranges',
  'content-range'
]

const COPY_REQ_HEADERS = [
  'range',
  'connection',
  'if-range'
]

function hexdec(str) {
  var buf, i, j, ref;
  if (str && str.length > 0 && str.length % 2 === 0 && !str.match(/[^0-9a-f]/)) {
    buf = new Buffer(str.length / 2);
    for (i = j = 0, ref = str.length; j < ref; i = j += 2) {
      buf[i / 2] = parseInt(str.slice(i, +(i + 1) + 1 || 9e9), 16);
    }
    return buf.toString();
  }
}

function putHeaderKeyIfExists(key : string, newHeaders : any, srcResp : any) {
  let value = null
  if (value = srcResp.headers[key]) {
    newHeaders[key] = value
  }
}

export class WarpPipe {
  private config : TWarpPipeConfiguration
  private startedAt: Date;
  private totalConnections: number;
  private currentConnections: number;

  constructor(config : TWarpPipeConfiguration = DEFAULT_CONFIGURATION) {
    this.config = config
    this.startedAt = new Date()
    this.totalConnections = 0
    this.currentConnections = 0
  }

  private getPath(req : NextApiRequest) {
    let path = (req.query.path as string[])?.join('/') || '/'
    if (path[0] !== '/') {
      path = `/${path}`
    }
    return path
  }

  private fourOhFour(resp: NextApiResponse, msg : string, url?: string) {
    resp.writeHead(404, {
      expires: "0",
      "Cache-Control": "no-cache, no-store, private, must-revalidate",
      "X-Frame-Options": this.config.headers["X-Frame-Options"],
      "X-XSS-Protection": this.config.headers["X-XSS-Protection"],
      "X-Content-Type-Options": this.config.headers["X-Content-Type-Options"],
      "Content-Security-Policy": this.config.headers["Content-Security-Policy"],
      "Strict-Transport-Security": this.config.headers["Strict-Transport-Security"]
    });
    return this.finish(resp, `Not Found: ${msg}`);
  }

  private finish(resp: NextApiResponse, str? : string) {
    this.currentConnections -= 1;
    if (this.currentConnections < 1) {
      this.currentConnections = 0;
    }

    return resp.connection && resp.end(str);
  }

  private debugLog(about, msg) {
    // console.log(`---------------------[${about}]---------------------`)
    // console.log(msg)
    // console.log(`---------------------[${about}]---------------------`)
  }

  private validDigest(destUrl : string, digest: string) {
    const hmac = crypto.createHmac("sha1", this.config.key)
    try {
      hmac.update(destUrl, 'utf-8')
    } catch (e) {
      return false
    }

    return digest === hmac.digest('hex')
  }

  private getProtocol(url : url.UrlWithStringQuery) {
    if (url.host) {
      if (url.protocol === 'https:') {
        return https
      } else if (url.protocol === 'http:') {
        return http
      }
    }

    return null
  }

  private supportsContentType(contentType: string) {
    if (!contentType) {
      return false
    }

    return this.config.mimeTypes.find((mimeType) => {
      //console.log(`${type} == ${contentType}`)
      return contentType.includes(mimeType)
    })
  }

  private processUrl(resp : NextApiResponse, url: url.UrlWithStringQuery, headers: any, remainingRedirects: number) {
    const Protocol = this.getProtocol(url)
    
    if (!Protocol) {
      return this.fourOhFour(resp, `Unknown protocol: ${(url as any).format()}`)
    }

    let queryPath = url.pathname
    if (url.query) {
      queryPath = `${queryPath}?${url.query}`
    }

    headers.host = url.host
    const requestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: queryPath,
      headers
    }

    if (this.config.keepAlive) {
      requestOptions['agent'] = false
    }

    this.debugLog('headers', headers)

    const srcReq = Protocol.get(requestOptions, (srcResp) => {
      let isFinished = true

      const contentLength = parseInt(srcResp.headers['content-length'])

      if (this.config.contentLengthLimit && contentLength > this.config.contentLengthLimit) {
        srcResp.destroy()
        return this.fourOhFour(resp, 'Content-Length exceed')
      }

      const newHeaders = {
        'Access-Control-Allow-Origin': '*',
        'content-type': srcResp.headers['content-type'],
        'cache-control': srcResp.headers['cache-control'] || 'public, max-age=31536000',
        'Warp-Pipe-Host': this.config.hostname,
        'X-Frame-Options': this.config.headers['X-Frame-Options'],
        'X-XSS-Protection': this.config.headers['X-XSS-Protection'],
        'X-Content-Type-Options': this.config.headers['X-Content-Type-Options'],
        'Content-Security-Policy': this.config.headers['Content-Security-Policy'],
        'Strict-Transport-Security': this.config.headers['Strict-Transport-Security']
      }
      
      COPY_RES_HEADERS.forEach((key) => {
        putHeaderKeyIfExists(key, newHeaders, srcResp)
      })

      srcResp.on('end', () => {
        if (isFinished) {
          return this.finish(resp);
        }
      });

      srcResp.on('error', () => {
        if (isFinished) {
          return this.finish(resp);
        }
      });

      switch (srcResp.statusCode) {
        case 301:
        case 302:
        case 303:
        case 307:
          srcResp.destroy()
          if (remainingRedirects <= 0) {
            return this.fourOhFour(resp, 'Exceed max depth')
          } else if (!srcResp.headers['location']) {
            return this.fourOhFour(resp, 'Missing location for redirect')
          } else {
            isFinished = false
            const nextUrl = (url as any).parse(srcResp.headers['location'])
            if (!((nextUrl.host != null) && (nextUrl.hostname != null))) {
              nextUrl.host = nextUrl.hostname = url.hostname;
              nextUrl.protocol = url.protocol;
            }

            this.debugLog("Redirected to", (nextUrl.format()));
            return this.processUrl(resp, nextUrl, headers, remainingRedirects - 1);
          }
        case 304:
          srcResp.destroy()
          return resp.writeHead(srcResp.statusCode, newHeaders);
        default:
          const contentType = newHeaders['content-type'];

          if (!this.supportsContentType(contentType)) {
            srcResp.destroy();
            this.fourOhFour(resp, `Unsupported content type: ${contentType}`);
            return;
          }

          resp.writeHead(srcResp.statusCode, newHeaders)
          this.debugLog("srcResp.headers", srcResp.headers)
          this.debugLog("newHeaders", newHeaders)
          console
          return srcResp.pipe(resp)
      }
    }).setTimeout(this.config.socketTimeout * 1000, () => {
      console.log('socket timeout!')
      resp.destroy()
      srcReq.destroy()
    }).on('error', (error) => {
      console.log('socket error', error)
      this.fourOhFour(resp, `Client request error: ${error.toString()}`)
    })

    resp.on('close', () => {
      srcReq.destroy()
    }).on('error', (error) => {
      srcReq.destroy()
    })
  }

  /**
   * Process next request
   */
  public handle(req: NextApiRequest, resp: NextApiResponse) {
    const path = this.getPath(req)

    if (req.method != 'GET' || path === '/') {
      return resp
        .writeHead(200, this.config.headers)
        .end('hwhat')
    } else if (path === '/status') {
      console.log('status got', this.config.headers)
      return resp
        .writeHead(200, this.config.headers)
        .end(`ok ${this.currentConnections}/${this.totalConnections} since ${this.startedAt}`)
    }

    this.totalConnections += 1
    this.currentConnections += 1

    const currentUrl = url.parse(path)

    delete req.headers.cookie

    let [queryDigest, encodedUrl] = currentUrl.pathname.replace(/^\//, '').split("/", 2)
    const destUrl = hexdec(encodedUrl) 

    this.debugLog("New request", {
      destUrl,
      url: req.url,
      headers: req.headers,
      digest: queryDigest
    })

    if (req.headers['via'] && req.headers['via'].indexOf(this.config.userAgent) !== -1) {
      return this.fourOhFour(resp, 'Requesting from self')
    }

    if (currentUrl.pathname && destUrl) {
      if (this.validDigest(destUrl, queryDigest)) {
        const transferredHeaders = {
          'Via': this.config.userAgent,
          'User-Agent': this.config.userAgent,
          'Accept': req.headers.accept || 'image/*',
          'Accept-Encoding': req.headers['accept-encoding'] || '',
          "X-Frame-Options": this.config.headers["X-Frame-Options"],
          "X-XSS-Protection": this.config.headers["X-XSS-Protection"],
          "X-Content-Type-Options": this.config.headers["X-Content-Type-Options"],
          "Content-Security-Policy": this.config.headers["Content-Security-Policy"]
        }

        COPY_REQ_HEADERS.forEach((key) => {
          putHeaderKeyIfExists(key, transferredHeaders, req)
        })

        this.debugLog('req.headers', req.headers)
        this.debugLog('transferredHeaders', transferredHeaders)

        const parsedDestUrl = url.parse(destUrl)
        return this.processUrl(resp, parsedDestUrl, transferredHeaders, this.config.maxRedirects)
      } else {
        return this.fourOhFour(resp, "checksum mismatch")
      }
    }

    this.fourOhFour(resp, "No pathname provided on the server")
  }
}