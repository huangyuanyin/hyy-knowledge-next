'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Table, message, notification } from 'antd'
import type { TableProps } from 'antd'
import CopyToClipboard from '@uiw/react-copy-to-clipboard'
import { base64UrlDecode, base64UrlEncode } from '@/utils/encrypt'
import { Query } from '@/type/index'
import { articleType } from '@/data/data'
import shareIcon from '@/assets/icons/share.svg'
import './title.css'

export default function TitlePage() {
  const router = useRouter()
  const [api, contextHolder2] = notification.useNotification()
  const query =
    useSearchParams().get('query') ||
    'eyJzaWQiOiIzIiwic25hbWUiOiLmtYvor5XkuK3lv4MiLCJsaWQiOiI2MCIsImxuYW1lIjoi6Ieq5Yqo5YyW5rWL6K-V6YOoLeW8gOWPkUZBUSIsImdpZCI6IjciLCJnbmFtZSI6IuiHquWKqOWMlua1i-ivlemDqCJ9'
  const decodedQuery = useRef<Query>({})
  const docValue = useRef<any>({})
  const [messageApi, contextHolder] = message.useMessage()
  const [titleList, setTitleList] = useState<ArtileType[]>([])

  interface ArtileType {
    id: number
    title: string
    creator: string
    update_datetime: string
    type: string
  }

  const columns: TableProps<ArtileType>['columns'] = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (_, record) => (
        <div className="flex">
          <Image className="mr-[8px]" src={articleType[record.type]} alt="" width={24} height={24} />
          <p className="leading-[24px] text-[14px] text-[#606266]">{record.title}</p>
        </div>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 300,
    },
    {
      title: '更新时间',
      dataIndex: 'update_datetime',
      key: 'update_datetime',
      width: 350,
    },
  ]

  useEffect(() => {
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      decodedQuery.current = result
    }
  }, [query])

  useEffect(() => {
    getTitleList()
    getArticle()
  }, [query])

  const getTitleList = async () => {
    const response = await fetch(`http://10.4.150.56:8029/public_category/?node_id=${decodedQuery.current.aid}&action=children`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      switch (response.status) {
        case 404:
          messageApi.error('分组不存在')
          break
        default:
          break
      }
      throw new Error('网络请求失败')
    }
    const res = await response.json()
    const { code, data, msg } = res
    if (code === 1000) {
      setTitleList(data)
    } else {
      messageApi.error(msg)
    }
  }

  const getArticle = async () => {
    try {
      const response = await fetch(`http://10.4.150.56:8029/public_data/${decodedQuery.current.aid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
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
      const { code, data, msg } = res
      if (code === 1000) {
        docValue.current = data
      } else {
        messageApi.error(msg)
      }
    } catch (error) {
      console.error('获取文章详情时出错:', error)
    }
  }

  return (
    <>
      {contextHolder}
      {contextHolder2}
      <Suspense>
        <div className="flex">
          <div className="flex-1 px-[24px] pt-[24px]">
            <Table
              columns={columns}
              dataSource={titleList}
              pagination={false}
              scroll={{ y: '80vh' }}
              expandable={{
                expandIcon: ({ expanded, onExpand, record }) => {
                  return null
                },
              }}
              onRow={(record) => ({
                onClick: () => {
                  const query = {
                    lid: decodedQuery.current.lid,
                    lname: decodedQuery.current.lname,
                    aid: record.id,
                    aname: record.title,
                  }
                  const hash = base64UrlEncode(JSON.stringify(query))
                  router.push(`/share/book/${record.type}?query=${hash}`)
                },
              })}
            />
          </div>
          <div className="w-[232px] ml-[24px] bt-[12px] mr-[18px] flex flex-col">
            <div className="mt-[8px]">{decodedQuery.current.aname}</div>
            <div className="bg-[#f5f6f7] h-[143px] w-full mt-[8px] rounded-md border border-solid border-[#dee0e3] flex items-center justify-center">
              <Image src={articleType['title']} alt="" width={68} height={68} />
            </div>
            <CopyToClipboard
              text={window.location.href}
              onClick={() => {
                api.success({
                  message: '复制成功',
                  description: '链接已复制到剪切板',
                  placement: 'topRight',
                })
              }}
            >
              <button className="w-full mt-[12px] mb-[16px] py-[4px] px-[20px] flex items-center justify-center border border-solid border-[#1456F0] h-[32px] text-[14px] rounded-md text-[#1456F0] box-border hover:bg-[#e0e9ff]">
                <Image className="mr-[2px]" src={shareIcon} alt="" width={14} height={14} />
                分享
              </button>
            </CopyToClipboard>
            <span className="leading-[24px] text-[#646973] text-[12px]">描述</span>
            <span className="text-[14px] leading-[24px] text-[#8f959e]">
              {docValue.current.description ? docValue.current.description : '暂无描述'}
            </span>
            <span className="text-[12px] text-[#646973] leading-[24px] mt-[12px]">所有者</span>
            <span className="text-[14px] leading-[24px] text-[#1f2329]">{docValue.current.creator_name}</span>
          </div>
        </div>
      </Suspense>
    </>
  )
}
