'use server'

import { db } from '@/db/db'

export async function getDocList(content_id: number) {
  try {
    const doc = await db.t_content_doc.findFirst({
      where: { content_id },
    })
    return doc
  } catch (ex) {
    return null
  }
}
