import FeedItem from "@detox/store/models/FeedItem";
import { Poster } from "@detox/store/models/Poster";
import { FeedArticle } from "@detox/store/models/FeedAttachment";

export interface IArticleReaderProps {
  articleUrl?: string
  article: FeedArticle
  story: FeedItem
  poster?: Poster

  onScroll?(y: number)
}