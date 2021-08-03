import { WarpPipe, DEFAULT_CONFIGURATION } from '@detox/warp-pipe'
import type { NextApiRequest, NextApiResponse } from 'next'

const warpPipe = new WarpPipe({
  ...DEFAULT_CONFIGURATION,
  key: process.env['PROXY_KEY'],
  hostname: process.env['APP_HOST']
})

export default (req: NextApiRequest, res: NextApiResponse) => {
  warpPipe.handle(req, res)
}