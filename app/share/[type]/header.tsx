'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { base64UrlDecode } from '@/utils/encrypt'
import { Query } from '@/type/index'
import mainIcon from '@/assets/favicon.ico'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserLoginForm } from '@/app/_components/form/user-login-form'
import Link from 'next/link'
// import { ChangeTheme } from '@/components/change-theme'

export default function Header({ query }: { query: string }) {
  const path = usePathname()
  const [decodedQuery, setDecodedQuery] = useState<Query>({
    aname: '',
  })
  const [isAuth, setIsAuth] = useState<boolean>(true)

  useEffect(() => {
    // setIsAuth(localStorage.getItem('token') ? true : false)
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      setDecodedQuery(result)
    }
  }, [query])

  const handleLoginSuccess = () => {
    window.location.reload()
  }

  function BookIcon() {
    return (
      <>
        {isAuth ? (
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
                width: '26px',
                height: '26px',
                marginRight: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
          </a>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={mainIcon}
                alt="XinAn Logo"
                style={{
                  width: '26px',
                  height: '26px',
                  marginRight: '6px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>用户登录</DialogTitle>
                <DialogDescription asChild>
                  <UserLoginForm username={''} password={''} onLoginSuccess={handleLoginSuccess} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </>
    )
  }

  return (
    <div className="h-[52px] flex items-center text-[14px] justify-between px-[20px] border-b border-[#e7e9e8] border-solid">
      <div className="flex items-center">
        {!path.includes('/book') && <BookIcon />}
        <span className="text-[14px] text-[#585a5a] max-w-[60vw]">{decodedQuery.aname}</span>
      </div>
      {/* <ChangeTheme /> */}
    </div>
  )
}
