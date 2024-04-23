import ArticleDetail from '../../../article'
import { ContentType } from '@/type/index'

export default function ArticlePage({ params }: { params: { type: ContentType; query: string } }) {
  return <ArticleDetail params={params} />
}
