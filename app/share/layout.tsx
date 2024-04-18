'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import Header from './[type]/header'
import Directory from './directory'

const ShareLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-[100vw] rounded-lg">
      <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
        <Directory currentPath={pathname} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85}>
        <div className="min-h-[100vh] max-w-[100vw] flex flex-col h-[100vh] overflow-auto">
          {pathname === '/share/book/index' ? null : <Header />}
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ShareLayout
