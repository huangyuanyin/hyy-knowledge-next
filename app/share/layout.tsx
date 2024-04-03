'use client'
import React from 'react'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import DocHeader from './_components/DocHeader'

const ShareLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup direction="vertical" className="min-h-[100vh] max-w-[100vw]">
      <ResizablePanel defaultSize={6} maxSize={6} minSize={6}>
        <DocHeader />
      </ResizablePanel>
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ShareLayout