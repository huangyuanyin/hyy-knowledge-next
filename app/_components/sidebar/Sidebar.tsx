import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChangeSpacePopover from '@/components/popver/ChangeSpacePopover'
import mainIcon from '@/assets/favicon.ico'

const Sidebar = () => {
  return (
    <div className="relative w-100vw h-100vh">
      <div className="flex justify-between box-border p-3">
        <div className="flex items-center justify-center h-10px">
          <Image
            src={mainIcon}
            alt="XinAn Logo"
            style={{
              width: '26px',
              height: '26px',
              margin: '6px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
          <span className="text-16px font-black mr-6px text-[#262626] cursor-pointer">信安</span>
          <ChangeSpacePopover />
        </div>
        <div className="flex items-center">
          <Avatar style={{ width: '30px', height: '30px' }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
