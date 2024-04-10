import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { base64UrlDecode } from '@/utils/encrypt'
import { Query } from '@/type/index'
import mainIcon from '@/assets/favicon.ico'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserLoginForm } from '@/app/_components/form/user-login-form'
import Link from 'next/link'

export default function Header() {
  const query = useSearchParams().get('query')
  const [decodedQuery, setDecodedQuery] = useState<Query>({
    aname: '',
  })
  const [isAuth, setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    setIsAuth(localStorage.getItem('token') ? true : false)
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      setDecodedQuery(result)
    }
  }, [query])

  const handleLoginSuccess = () => {
    window.location.reload()
  }

  return (
    <div className="h-full flex items-center text-[14px] justify-between px-[20px]">
      <div className="flex items-center">
        {isAuth ? (
          <Link href={`http://10.4.150.55:8080/knowledge/#/dashboard`} className="inline-flex items-center">
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
          </Link>
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

        <span className="text-[14px] text-[#585a5a] max-w-[60vw]">{decodedQuery.aname}</span>
      </div>
    </div>
  )
}
