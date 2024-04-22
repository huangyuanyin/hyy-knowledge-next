import ArticleDetail from '../../article'
import { ContentType } from '@/type/index'

export default function ArticlePage({ params, searchParams }: { params: { type: ContentType }; searchParams: any }) {
  return <ArticleDetail params={params} searchParams={searchParams} />
}
