'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight, Home, ListTree, ChevronDown } from 'lucide-react'
import mainIcon from '@/assets/favicon.ico'
import foldIcon from '@/assets/icons/fold.svg'
import expandIcon from '@/assets/icons/expand.svg'
import { DownOutlined } from '@ant-design/icons'
import { ConfigProvider, Tooltip, Tree, message } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import './share.css'
import { base64UrlDecode, base64UrlEncode } from '@/utils/encrypt'
import { Query } from '@/type/index'
import Loading from '@/components/loading'
import Empty from '@/components/empty'

export default function Directory() {
  const router = useRouter()
  const currentPath = usePathname()
  const [messageApi, contextHolder] = message.useMessage()
  const [bookDetail, setBookDetail] = useState<any>({
    icon: mainIcon,
  })
  const [treeData, setTreeData] = useState<TreeDataNode[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const decodedQuery = useRef<Query>({})
  const [encodeQuery, setEncodeQuery] = useState<string>('')
  const [isFolder, setIsFolder] = useState<boolean>(true)
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const type = useRef<string>(currentPath.split('/')[currentPath.split('/').length - 2])

  useEffect(() => {
    if (currentPath) {
      const query = currentPath.split('/')[currentPath.split('/').length - 1]
      const result = JSON.parse(base64UrlDecode(query))
      decodedQuery.current = result
      setSelectedId(decodedQuery.current.aid || null)
    }
  }, [currentPath])

  useEffect(() => {
    getBookDetail()
    type.current = currentPath.split('/')[currentPath.split('/').length - 2]
  }, [currentPath])

  useEffect(() => {
    getArticleList()
  }, [])

  const getArticleList = async () => {
    try {
      setIsLoading(true)
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
        data.forEach((node: any) => {
          convertChildrenToEmptyArray(node)
        })
        setTreeData(data)
      } else {
        messageApi.error(msg)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  // 将children为null的节点转换为children为[]
  function convertChildrenToEmptyArray(node: any) {
    if (node.children === null) {
      node.children = []
    } else if (Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        convertChildrenToEmptyArray(child)
      })
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
    const { code, data, msg } = res
    if (code === 1000) {
      setBookDetail(data)
    } else {
      messageApi.error(msg)
    }
  }

  const toExpandOrFold = () => {
    if (isFolder) {
      const keys: string[] = []
      expandAll(treeData, keys)
      setExpandedKeys(keys)
    } else {
      setExpandedKeys([])
    }
    setIsFolder(!isFolder)
  }

  // 展开所有节点
  const expandAll = (nodes: any[], expandedKeys: string[]) => {
    nodes.forEach((node) => {
      expandedKeys.push(node.id.toString())
      if (node.children) {
        expandAll(node.children, expandedKeys)
      }
    })
  }

  const handleSelect = (keys: any, info: { node: any }) => {
    setSelectedId(info.node.id.toString())
    const query = {
      lid: decodedQuery.current.lid,
      lname: decodedQuery.current.lname,
      aid: info.node.id,
      aname: info.node.title,
    }
    const hash = base64UrlEncode(JSON.stringify(query))
    setEncodeQuery(hash)
    router.push(`/share/book/${info.node.type}/${hash}`)
  }

  const toUrl = (type: string) => {
    switch (type) {
      case 'index':
        setSelectedId(null)
        const query = {
          lid: decodedQuery.current.lid,
          lname: decodedQuery.current.lname,
        }
        const hash = base64UrlEncode(JSON.stringify(query))
        setEncodeQuery(hash)
        router.push(`/share/book/${type}/${hash}`)
        break
      default:
        break
    }
  }

  return (
    <>
      {contextHolder}
      <div className="h-[100vh] w-full flex flex-col">
        <div className="mt-[10px] mx-[10px] pb-[12px] border-b border-[rgba(0,0,0,0.04)]">
          {/* <div className="flex items-center w-full h-[45px] pt-[16px] pb-[6px] pl-[6px]">
            <a
              href={`http://10.4.150.55:8080/knowledge/#/dashboard`}
              target="_blank"
              rel="noopener noreferrer" // 出于安全考虑，建议添加这两个属性
              className="inline-flex items-center"
            >
              <Image
                src={mainIcon}
                alt="XinAn Logo"
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <ChevronRight className="h-[14px] w-[14px] mx-[2px]" />
              <span className="text-xs cursor-pointer text-[#8a8f8d]">信安知识库</span>
            </a>
          </div> */}
          <div className="flex items-center w-full flex-1 ml-[4px] h-[36px]">
            <Image
              src={bookDetail.icon}
              alt="XinAn Logo"
              width={20}
              height={20}
              style={{
                borderRadius: '4px',
                marginRight: '10px',
              }}
            />
            <span className="text-base text-[#262626] font-bold">{decodedQuery.current.lname}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={`h-[32px] flex items-center cursor-pointer relative py-[5px] px-[8px] mx-[8px] mt-[10px] rounded-md hover:bg-[#eff0f0] ${
              type.current === 'index' ? 'bg-[#eff0f0]' : ''
            }`}
            onClick={() => toUrl('index')}
          >
            <Home className="h-[16px] w-[16px] mr-[12px] text-[#262626]" />
            <span className="text-sm text-[#262626]">首页</span>
          </div>
          <div className="h-[32px] flex items-center justify-between cursor-pointer relative py-[5px] px-[8px] mx-[8px] mt-[6px] rounded-md">
            <div className="flex items-center">
              <ListTree className="h-[16px] w-[16px] mr-[12px] text-[#262626]" />
              <span className="text-sm text-[#262626]">目录</span>
            </div>
            {/* <Tooltip title={isFolder ? '全部展开' : '全部折叠'} arrow={false}>
              <Image
                src={isFolder ? foldIcon : expandIcon}
                alt=""
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={toExpandOrFold}
              />
            </Tooltip> */}
          </div>
        </div>

        {isLoading ? (
          <Loading text="目录加载中..." height="50vh" />
        ) : !treeData.length ? (
          <Empty height="40vh" />
        ) : (
          <div className="articleTree px-[8px] w-full mt-[6px] flex-1 overflow-y-auto h-[calc(100%-190px)] overflow-x-hidden">
            <ConfigProvider
              theme={{
                components: {
                  Tree: {
                    nodeHoverBg: '#eff0f0',
                    nodeSelectedBg: '#eff0f0',
                    directoryNodeSelectedBg: '#eff0f0',
                    directoryNodeSelectedColor: '#262626',
                    titleHeight: 34,
                  },
                },
              }}
            >
              <Tree
                autoExpandParent
                blockNode
                switcherIcon={(props: any) => {
                  const rotateStyle = props.expanded ? { transform: 'rotate(360deg)' } : {}
                  return <ChevronDown className="h-[13px] w-[13px] text-[#585a5a] leading-6 transform -rotate-90" style={rotateStyle} />
                }}
                selectedKeys={selectedId !== null ? [selectedId] : []}
                defaultExpandedKeys={selectedId !== null ? [selectedId] : []}
                defaultSelectedKeys={selectedId !== null ? [selectedId] : []} // 设置默认选中的节点
                fieldNames={{ title: 'title', key: 'id', children: 'children' }}
                treeData={treeData}
                titleRender={(node: any) => (
                  <div className="flex items-center w-full tree-node">
                    <p className={`text-sm text-[#262626]  truncate w-full leading-[34px] ${selectedId === node.id ? 'font-bold' : ''}`}>
                      {node.title}
                    </p>
                  </div>
                )}
                onSelect={handleSelect}
              />
            </ConfigProvider>
          </div>
        )}
      </div>
    </>
  )
}
