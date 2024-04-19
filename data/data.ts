import folderIcon from '@/assets/icons/folder.svg'
import docIcon from '@/assets/icons/doc.svg'
import sheetIcon from '@/assets/icons/sheet.svg'
import mindIcon from '@/assets/icons/mind.svg'
import pptIcon from '@/assets/icons/ppt.svg'
import fileIcon from '@/assets/icons/file.svg'

interface ArticleType {
  [key: string]: string // 每个类型对应一个图片 URL
}

export const articleType: ArticleType = {
  title: folderIcon,
  doc: docIcon,
  sheet: sheetIcon,
  mind: mindIcon,
  ppt: pptIcon,
  file: fileIcon,
}
