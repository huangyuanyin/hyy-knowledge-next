'use client'

import { useEffect, useRef, useState } from 'react'
import { Base64 } from 'js-base64'
import { message } from 'antd'
import Tinymce from '@/app/_components/tinymce/tinymce'
import Markdown from '@/app/_components/markdown/markdown'
import { base64UrlDecode } from '@/utils/encrypt'
import { ContentType, Query } from '@/type/index'
import Loading from '@/components/loading'
import { getArticleDetail } from './action'
import LuckySheetEdtior from '@/components/excel'
import { sheetData } from '@/components/excel/data'

const iframeUrl: Record<ContentType, { src: string; opera?: string }> = {
  sheet: {
    src: process.env.NEXT_PUBLIC_BASE_SHEET_URL!,
    opera: 'getSheetData',
  },
  mind: {
    src: process.env.NEXT_PUBLIC_BASE_MINDMAP_URL!,
    opera: 'getData',
  },
  ppt: {
    src: process.env.NEXT_PUBLIC_BASE_PPT_URL!,
    opera: 'getPPTData',
  },
  file: {
    src: '',
  },
  doc: {
    src: '',
  },
}

export default function DocSharePage({ params }: { params: { type: ContentType; query: string } }) {
  const [messageApi, contextHolder] = message.useMessage()
  const { type, query } = params
  const docValue = useRef<string>('')
  const pluginkey = useRef<string>('')
  const [decodedQuery, setDecodedQuery] = useState<Query>({
    aid: '',
  })
  const [iframeSrc, setIframeSrc] = useState<string>('')
  const shareIframe = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      const decodedQuery = JSON.parse(base64UrlDecode(query))
      setDecodedQuery(decodedQuery)
    }
  }, [query])

  useEffect(() => {
    if (decodedQuery.aid) {
      getArticle()
    }
  }, [decodedQuery.aid, type])

  useEffect(() => {
    judegeType()
  }, [docValue.current, type])

  const judegeType = () => {
    if (['sheet', 'mind', 'ppt'].includes(type)) {
      setIframeSrc(`${iframeUrl[type].src}?time=${Date.now()}`)
    } else if (type === 'file') {
      const url = 'http://10.4.150.56:8012/onlinePreview?url=' + encodeURIComponent(Base64.encode(docValue.current))
      setIframeSrc(url)
    }
  }

  const getArticle = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://10.4.150.56:8029/public_data/${decodedQuery.aid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        setIsLoading(false)
        switch (response.status) {
          case 401:
            messageApi.error('未登录或登录已过期，请重新登录')
            break
          case 403:
            messageApi.error('无权限访问')
            break
          case 404:
            messageApi.error('文章不存在')
            break
          default:
            break
        }
        throw new Error('网络请求失败')
      }
      const res = await response.json()
      setIsLoading(false)
      const { code, data, msg } = res
      if (code === 1000) {
        docValue.current = data.body
        pluginkey.current = data.pluginkey
        if (type === 'file') return judegeType()
        sendMessageToIframe()
      } else {
        messageApi.error(msg)
      }
      // const res = await getArticleDetail(type, Number(query.aid))
      // setIsLoading(false)
      // if (res) {
      //   docValue.current = res.body
      //   if (type === 'file') return judegeType()
      //   sendMessageToIframe()
      // }
    } catch (error) {
      setIsLoading(false)
      console.error('获取文章详情时出错:', error)
    }
  }

  const sendMessageToIframe = () => {
    if (shareIframe.current) {
      shareIframe.current.onload = () => {
        const data = type === 'sheet' ? JSON.parse(docValue.current) : docValue.current
        shareIframe.current!.contentWindow!.postMessage({ type: iframeUrl[type].opera, data, isPreview: true }, '*')
      }
    }
  }

  return (
    <>
      {contextHolder}
      {!['doc', 'sheet'].includes(type) ? (
        <div className="h-[calc(100vh-52px)]">
          {iframeSrc ? (
            <iframe
              id="iframe"
              className="iframe relative"
              src={iframeSrc}
              frameBorder={0}
              width="100%"
              height="100%"
              ref={shareIframe}
            ></iframe>
          ) : null}
        </div>
      ) : !isLoading ? (
        type === 'doc' ? (
          pluginkey.current === 'tinymce' ? (
            <Tinymce value={docValue.current} />
          ) : (
            <Markdown value={docValue.current} />
          )
        ) : (
          <LuckySheetEdtior content={docValue.current || sheetData} />
        )
      ) : (
        <Loading text="精彩内容即将呈现..." height="80vh" />
      )}
    </>
  )
}
