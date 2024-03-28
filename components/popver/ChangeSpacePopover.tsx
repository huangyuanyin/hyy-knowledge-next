'use client'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import axios from 'axios'
import { message } from 'antd'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import selectIcon from '@/assets/icons/select.svg'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyMjA4Njc5LCJpYXQiOjE3MTE2MDM4NzksImp0aSI6IjIwZmRjZGVkNjQwNzQyZjNhMGM3OWNkYzFjYjNlZGZmIiwidXNlcl9pZCI6ImJmOTAxYTAzN2ZlMDQ3MTViOTdiZThhYWVmY2U3ZDk4IiwidXNlcm5hbWUiOiJkb3V6ZyIsIm5pY2tuYW1lIjoiXHU3YWE2XHU1ZmQ3XHU1MjFhIiwiZW1haWwiOiJkb3V6Z0BpbmZvc2VjLmNvbS5jbiIsInJvbGVfbmFtZSI6Ilx1N2JhMVx1NzQwNlx1NTQ1OCIsInBvc3RfbmFtZSI6Ilx1NmQ0Ylx1OGJkNVx1NjAzYlx1NzZkMSIsImRlcHRfbmFtZSI6Ilx1NGVhN1x1NTRjMVx1NmQ0Ylx1OGJkNVx1NGUwMFx1OTBlOCJ9.sADivEMoZhQsc5QaBtpQoKOgUok9Fn-iTPH9oH-RiBA'

const ChangeSpacePopover = (props: any) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [spaces, setSpaces] = useState([])
  const [isPopverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    if (isPopverOpen) {
      getSpaceList()
    }
  }, [isPopverOpen])

  const getSpaceList = async () => {
    try {
      const res = await axios.get('http://10.4.150.27:8029/spaces/?permusername=douzg', {
        headers: {
          Authorization: `${token}`,
        },
      })
      if (res.data.code === 1000) {
        setSpaces(res.data.data)
      } else {
        messageApi.error(res.data.msg)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handlePopoverOpen = () => {
    setIsPopoverOpen(!isPopverOpen)
  }

  return (
    <>
      {contextHolder}
      <Popover open={isPopverOpen} onOpenChange={handlePopoverOpen}>
        <PopoverTrigger asChild>
          <span className="hover:bg-[#eff0f0] rounded flex items-center justify-center ml-1">
            <ChevronDown className="text-[#bec0bf] cursor-pointer w-4 h-4" />
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-[312px] px-[20px] py-[12px]">
          {props.currentSider !== 'Sidebar' ? (
            // 个人空间
            <PersonalView spaces={spaces} />
          ) : (
            // 组织空间
            <OrganizeView />
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

const PersonalView = ({ spaces }: { spaces: any[] }) => {
  return (
    <>
      <h4 className="mt-[16px] mb-[16px] text-[12px] leading-[17px]  text-[#8a8f8d]">{'个人'}</h4>
      {spaces.map((item: any, index) => (
        <div className="space_wrap" key={`spaces-${index}`}>
          {item.spacetype === 'personal' && (
            <div className="py-[6px] px-[8px] rounded-[6px] box-border flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Image className={item.icon} src={`http://10.4.150.56:8032/${item.icon}`} alt="" width={32} height={32} />
                <div className=" h-[40px] ml-[14px] w-[168px] overflow-hidden flex flex-1 justify-center flex-col ">
                  <p className="block text-[14px] text-[#262626] overflow-hidden text-ellipsis whitespace-nowrap leading-5">
                    {item.spacename}
                  </p>
                  <p className="text-[10px] text-[#8a8f8d] leading-[14px] overflow-hidden text-ellipsis whitespace-nowrap">我自己</p>
                </div>
              </div>
              <Image src={selectIcon} alt="" width={16} height={16} />
            </div>
          )}
        </div>
      ))}
      <h4 className="mt-[16px] mb-[16px] text-[12px] leading-[17px]  text-[#8a8f8d]">{'组织'}</h4>
      {spaces.map((item: any, index) => (
        <div className="space_wrap" key={`spaces-${index}`}>
          {item.spacetype === 'organization' && (
            <div className="py-[6px] px-[8px] rounded-[6px] box-border flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Image className={item.icon} src={item.icon} alt="" width={32} height={32} />
                <div className=" h-[40px] ml-[14px] w-[168px] overflow-hidden flex flex-1 justify-center flex-col ">
                  <p className="block text-[14px] text-[#262626] overflow-hidden text-ellipsis whitespace-nowrap leading-5">
                    {item.spacename}
                  </p>
                  <p className="text-[10px] text-[#8a8f8d] leading-[14px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {`${item.member_count + 1 || 1}成员`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

const OrganizeView = () => {
  return <div>组织空间</div>
}

export default ChangeSpacePopover
