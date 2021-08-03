export type TFeed = {
  feedUrl: string
  title: string
}

export type TFeeds = Array<TFeed>

export default function parseHelper(content) {
  return new Promise<TFeeds>(async (resolve, reject) => {
    const parseOpml = await import(/* webpackChunkName: "opml" */ 'node-opml-parser')
    parseOpml(content, (err, items) => {
      if (err) {
        reject(err)
      } else {
        resolve(items)
      }
    })
  })
}
