import { useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { useNavigate } from "@detox/shared"
import { useStoreData } from "@detox/store"
import { useRoute } from "@react-navigation/native"

/**
 * Depending if story is loaded show story title in header or show default translated title
 * For unread we also show number of unread items
 */
export default function useReaderTitle() {
  const { t } = useTranslation()
  const { name } = useRoute() as any
  const {
    setOptions
  } = useNavigate()

  const { story, loading, unreadCount } = useStoreData(({ screens: { stories: { unreadCount, viewArticle } } }) => ({
    story: viewArticle.story,
    loading: viewArticle.isLoading,
    unreadCount: unreadCount
  }))

  useEffect(() => {
    if (story) {
      setOptions({ title: t(`titles.${name}.story`, { title: story.title }) })
    } else if (loading) {
      setOptions({ title: t(`titles.${name}.loading`) })
    } else {
      setOptions({ title: t(`titles.${name}.browse`, { unreadCount }) })
    }
  }, [story, t, setOptions, unreadCount, name])
}