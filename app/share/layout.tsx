'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Header from './[type]/[query]/header'
import Directory from './directory'

const ShareLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-[100vw] rounded-lg">
      {pathname.includes('/share/book/') && (
        <>
          <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
            <Directory />
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
      )}
      <ResizablePanel defaultSize={85}>
        <div className="min-h-[100vh] max-w-[100vw] flex flex-col h-[100vh] overflow-auto">
          {pathname.includes('/share/book/index') ? null : <Header />}
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ShareLayout
