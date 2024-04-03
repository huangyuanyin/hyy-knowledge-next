'use client'
import Image from 'next/image'
import mainIcon from '@/assets/favicon.ico'

const DocHeader = () => {
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
        <span className="text-[14px] text-[#585a5a] max-w-[60vw]">信安2222222</span>
      </div>
    </div>
  )
}

export default DocHeader
