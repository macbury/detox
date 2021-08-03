export type TFeed = {
  feedUrl: string
  title: string
}

export type TFeeds = Array<TFeed>

export default function parseHelper(content) {
  return new Promise<TFeeds>((resolve, reject) => {
    resolve(null)
  })
}
