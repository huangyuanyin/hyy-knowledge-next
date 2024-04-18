import ArticleDetail from '../../article'
import { ContentType } from '@/type/index'

export default function ArticlePage({ params }: { params: { type: ContentType } }) {
  return <ArticleDetail params={params} />
}
