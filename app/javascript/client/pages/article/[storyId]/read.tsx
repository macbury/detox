import React from 'react';
import Head from 'next/head'
import { DocumentContext } from 'next/document'
import Reader from '@detox/styleguide/Reader'
import NotFoundOrLoading from '@detox/styleguide/ui/NotFoundOrLoading'
import { useStoreData, withSsrStore } from '@detox/store'
import WebApp from '../../../app/WebApp'

function ShowArticleContent() {
  const {
    story,
    poster,
    article
  } = useStoreData(({ screens: { stories: { viewArticle } } }) => ({
    story: viewArticle.story,
    poster: viewArticle.poster,
    article: viewArticle.article
  }))

  if (!story) {
    return <NotFoundOrLoading />
  }

  return (
    <React.Fragment>
      <Head>
        <title>{story.title}</title>
      </Head>
      <Reader
        poster={poster}
        title={story.title}
        content={article.body}
        publishedAt={story.publishedAt}
        url={story.permalink}
        channelName={story.channel?.name} />
    </React.Fragment>
  )
}

export default function ReadArticle(pageProps) {
  return (
    <WebApp {...pageProps}>
      <ShowArticleContent />
    </WebApp>
  )
}

export async function getServerSideProps({ query: { storyId }, req } : DocumentContext) {
  return withSsrStore(req, async ({ channels, screens: { stories: { viewArticle } } }) => {
    await channels.refresh()
    await viewArticle.fetch(storyId, true)
    const found = !!viewArticle.story
    console.log(`Found: ${storyId}`, found)
    return found
  }, { authRequired: true })
}
