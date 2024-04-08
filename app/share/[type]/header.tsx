import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { base64UrlDecode } from '@/utils/encrypt'
import { Query } from '@/type/index'
import mainIcon from '@/assets/favicon.ico'

export default function Header() {
  const query = useSearchParams().get('query')
  const [decodedQuery, setDecodedQuery] = useState<Query>({
    aname: '',
  })

  useEffect(() => {
    if (query) {
      const result = JSON.parse(base64UrlDecode(query))
      setDecodedQuery(result)
    }
  }, [query])

  return (
    <div className="h-full flex items-center text-[14px] justify-between px-[20px]">
      <div className="flex items-center">
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
        <span className="text-[14px] text-[#585a5a] max-w-[60vw]">{decodedQuery.aname}</span>
      </div>
    </div>
  )
}
