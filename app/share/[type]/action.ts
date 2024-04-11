'use server'

import { db } from '@/db/db'
import { ContentType } from '@/type/index'

// 创建一个映射，将类型名称映射到模型
const ContentModels: { [K in ContentType]: any } = {
  doc: db.t_content_doc,
  sheet: db.t_content_sheet,
  ppt: db.t_content_ppt,
  mind: db.t_content_mind,
  file: db.t_content_mind,
}

export async function getArticleDetail(type: ContentType, content_id: number) {
  try {
    // 根据类型获取对应的模型
    const model = ContentModels[type]
    if (!model) {
      return null
    }
    // 使用模型查询数据
    const doc = await model.findFirst({
      where: { content_id },
    })
    return doc
  } catch (ex) {
    return null
  }
}
