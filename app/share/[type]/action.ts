'use server'

import { db } from '@/db/db'

export async function getDocList(id: number, content_id: number) {
  try {
    const doc = await db.t_content_doc.findUnique({
      where: { id, content_id },
    })
    return doc
  } catch (ex) {
    return null
  }
}
