'use client'

import { useEffect, useRef, useState } from 'react'
import './excel.css'

interface IProps {
  content: string
}

export default function LuckySheetEdtior(props: IProps) {
  const { content } = props
  // Flag to track whether the scripts are loaded
  const script1Loaded = useRef(false)
  const script2Loaded = useRef(false)

  // Include stylesheets directly in the head of the document
  useEffect(() => {
    const linkElement1 = document.createElement('link')
    linkElement1.rel = 'stylesheet'
    linkElement1.href = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css'
    document.head.appendChild(linkElement1)

    const linkElement2 = document.createElement('link')
    linkElement2.rel = 'stylesheet'
    linkElement2.href = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css'
    document.head.appendChild(linkElement2)

    const linkElement3 = document.createElement('link')
    linkElement3.rel = 'stylesheet'
    linkElement3.href = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css'
    document.head.appendChild(linkElement3)

    const linkElement4 = document.createElement('link')
    linkElement4.rel = 'stylesheet'
    linkElement4.href = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css'
    document.head.appendChild(linkElement4)

    // Add cleanup function to remove the link elements when the component unmounts
    return () => {
      document.head.removeChild(linkElement1)
      document.head.removeChild(linkElement2)
      document.head.removeChild(linkElement3)
      document.head.removeChild(linkElement4)
    }
  }, [])

  useEffect(() => {
    // Load plugin.js script
    const scriptElement1 = document.createElement('script')
    scriptElement1.src = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js'
    scriptElement1.type = 'text/javascript'
    scriptElement1.onload = () => {
      if (!script1Loaded.current) {
        // plugin.js script has loaded, now load luckysheet.umd.js script
        script1Loaded.current = true
        console.log('plugin.js loaded')
        const scriptElement2 = document.createElement('script')
        scriptElement2.src = 'https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js'
        scriptElement2.type = 'text/javascript'
        scriptElement2.onload = () => {
          if (!script2Loaded.current) {
            // Both scripts have loaded, now you can initialize Luckysheet
            script2Loaded.current = true
            console.log('luckysheet.umd.js loaded')
            // @ts-ignore
            const luckysheet = window.luckysheet
            luckysheet.create({
              container: 'luckysheetDiv',
              showinfobar: false, // 是否显示顶部信息栏
              lang: 'zh', // 中文,
              data: JSON.parse(content),
              showtoolbar: false, // 是否显示工具栏
              showstatisticBar: false, // 是否显示统计信息栏
              sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
              allowEdit: false, // 是否允许前台编辑
              enableAddRow: false, // 是否允许前台添加行
              enableAddCol: false, // 是否允许前台添加列
              enableAddBackTop: false, // 返回顶部按钮
            })

            // Add cleanup function to remove the script elements when the component unmounts
            return () => {
              document.head.removeChild(scriptElement1)
              document.head.removeChild(scriptElement2)
            }
          }
        }

        // Append luckysheet.umd.js script to head
        document.head.appendChild(scriptElement2)
      }
    }
    // Append plugin.js script to head
    document.head.appendChild(scriptElement1)
  }, [])

  return <>{<div id="luckysheetDiv" className="luckysheet_wrap"></div>}</>
}
