'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { ConfigProvider, Tree, message } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import { ContentType, Query } from '@/type/index'
import Icon from '@/assets/icons/1.svg'
import { base64UrlDecode, base64UrlEncode } from '@/utils/encrypt'

export default function BookIndex({ params }: { params: { type: ContentType } }) {
  const router = useRouter()
  const query =
    useSearchParams().get('query') ||
    'eyJzaWQiOiIzIiwic25hbWUiOiLmtYvor5XkuK3lv4MiLCJsaWQiOiI2MCIsImxuYW1lIjoi6Ieq5Yqo5YyW5rWL6K-V6YOoLeW8gOWPkUZBUSIsImdpZCI6IjciLCJnbmFtZSI6IuiHquWKqOWMlua1i-ivlemDqCJ9'
  const [messageApi, contextHolder] = message.useMessage()
  const [treeData, setTreeData] = useState<TreeDataNode[]>([])
  const [bookDetail, setBookDetail] = useState<any>({})
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const decodedQuery = useRef<Query>({})

  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  const onExpand = (expandedKeys: React.Key[]) => {
    setExpandedKeys(expandedKeys as string[])
  }

  useEffect(() => {
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      decodedQuery.current = result
    }
  }, [query])

  useEffect(() => {
    getArticleList()
    getBookDetail()
  }, [query])

  const getArticleList = async () => {
    try {
      setIsLoading(true)
      console.log(decodedQuery.current)
      const response = await fetch(`http://10.4.150.56:8029/docs_tree/${decodedQuery.current.lid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        setIsLoading(false)
        switch (response.status) {
          case 404:
            messageApi.error('知识库不存在')
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
        setTreeData(data)
      } else {
        messageApi.error(msg)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const getBookDetail = async () => {
    const response = await fetch(`http://10.4.150.56:8029/docs/${decodedQuery.current.lid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      setIsLoading(false)
      switch (response.status) {
        case 404:
          messageApi.error('知识库不存在')
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
      setBookDetail(data)
    } else {
      messageApi.error(msg)
    }
  }

  const handleSelect = (selectedKeys: any, info: any) => {
    const query = {
      lid: decodedQuery.current.lid,
      lname: decodedQuery.current.lname,
      aid: info.node.id,
      aname: info.node.title,
    }
    const hash = base64UrlEncode(JSON.stringify(query))
    router.push(`/share/book/${info.node.type}?query=${hash}`)
  }

  return (
    <>
      {contextHolder}
      <div className="px-[32px] pt-[64px] relative bg-[#fafafa]">
        <div className="max-w-[1024px] bg-white p-[32px] min-h-[calc(100vh-64px)] rounded-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={bookDetail.icon}
                alt=""
                width={38}
                height={38}
                style={{
                  borderRadius: '4px',
                }}
              />
              <span className="text-[28px] font-bold ml-[18px] text-[#262626]">信安更新日志</span>
            </div>
            <div></div>
          </div>
          <div className="flex items-center my-[6px] ml-[58px] mt-[15px]">
            <span className="text-sm text-[#8a8f8d] text-center mr-[33px]">
              <b className="text-lg font-bold text-[#585a5a] mr-[4px]">{bookDetail.article_count}</b>
              文档
            </span>
            <span className="text-sm text-[#8a8f8d] text-center mr-[33px]">
              <b className="text-lg font-bold text-[#585a5a] mr-[4px]">{bookDetail.word_count}</b>字
            </span>
          </div>
          <div className="h-[52px]"></div>
          <div className="">
            <ConfigProvider
              theme={{
                components: {
                  Tree: {
                    nodeHoverBg: '#eff0f0',
                    directoryNodeSelectedColor: '#262626',
                    titleHeight: 34,
                  },
                },
              }}
            >
              <Tree
                blockNode
                switcherIcon={(props: any) => {
                  const rotateStyle = expandedKeys.includes(props.id) ? { transform: 'rotate(360deg)' } : {}
                  return <ChevronDown className="h-[14px] w-[14px] text-[#585a5a] leading-6 transform -rotate-90" style={rotateStyle} />
                }}
                fieldNames={{ title: 'title', key: 'id', children: 'children' }}
                treeData={treeData}
                titleRender={(node: any) => (
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-sm text-[#262626] truncate leading-[34px] block`}>{node.title}</span>
                    {node.type !== 'title' && <span className="flex-1 mx-[16px] border-t border-dashed border-[#d8dad9]"></span>}
                    {node.type !== 'title' && <span className="text-right block">{node.update_datetime}</span>}
                  </div>
                )}
                onSelect={handleSelect}
                onExpand={onExpand}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  )
}
