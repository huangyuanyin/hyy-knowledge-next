'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { Tree, message } from 'antd'
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
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const decodedQuery = useRef<Query>({})

  useEffect(() => {
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      decodedQuery.current = result
    }
  }, [query])

  useEffect(() => {
    getArticleList()
  }, [query])

  const getArticleList = async () => {
    try {
      setIsLoading(true)
      console.log(decodedQuery.current)
      const response = await fetch(`http://10.4.150.56:8029/article_tree/${decodedQuery.current.lid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzOTMzODUyLCJpYXQiOjE3MTMzMjkwNTIsImp0aSI6IjY1NDc3MzFjMDJmYzRlYTRhYzJiNGJjNWQ1MjYwNDBhIiwidXNlcl9pZCI6ImJmOTAxYTAzN2ZlMDQ3MTViOTdiZThhYWVmY2U3ZDk4IiwidXNlcm5hbWUiOiJkb3V6ZyIsIm5pY2tuYW1lIjoiXHU3YWE2XHU1ZmQ3XHU1MjFhIiwiZW1haWwiOiJkb3V6Z0BpbmZvc2VjLmNvbS5jbiIsInJvbGVfbmFtZSI6Ilx1N2JhMVx1NzQwNlx1NTQ1OCIsInBvc3RfbmFtZSI6Ilx1NmQ0Ylx1OGJkNVx1NjAzYlx1NzZkMSIsImRlcHRfbmFtZSI6Ilx1NGVhN1x1NTRjMVx1NmQ0Ylx1OGJkNVx1NGUwMFx1OTBlOCJ9.br1Seva2v0elXPcLTtBlGlwuI-9jZPWBrVWLu_Aox_A',
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
                src={Icon}
                alt=""
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '4px',
                }}
              />
              <span className="text-[28px] font-bold ml-[18px] text-[#262626]">信安更新日志</span>
            </div>
            <div></div>
          </div>
          <div className="flex items-center my-[6px] ml-[58px]">
            <span className="text-sm text-[#8a8f8d] text-center mr-[33px]">
              <b className="text-lg font-bold text-[#585a5a] mr-[4px]">266</b>
              文档
            </span>
            <span className="text-sm text-[#8a8f8d] text-center mr-[33px]">
              <b className="text-lg font-bold text-[#585a5a] mr-[4px]">108664</b>字
            </span>
          </div>
          <div className="h-[52px]"></div>
          <div className="">
            <Tree
              autoExpandParent
              blockNode
              switcherIcon={<ChevronDown className="h-[14px] w-[14px] text-[#585a5a] leading-6" />}
              fieldNames={{ title: 'title', key: 'id', children: 'children' }}
              treeData={treeData}
              titleRender={(node: any) => (
                <div className="flex items-center w-full">
                  <p className={`text-sm text-[#262626]  truncate w-full`}>{node.title}</p>
                </div>
              )}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </>
  )
}
