import Image from 'next/image'
import EmptyImg from '@/assets/img/empty.png'

interface IProps {
  text?: string
  height?: string
  img?: string
}

export default function Empty(props: IProps) {
  const { text = '暂无数据', height = '800px', img = EmptyImg } = props

  return (
    <div className="m-h-[800px] pt-[40px] pb-[56px] flex flex-col items-center justify-center text-center box-border" style={{ height }}>
      <div className=" h-[110px] mb-[16px] box-border flex items-center justify-center">
        <Image src={img} alt="" width={120} height={83.04} />
      </div>
      <p className="text-[#8a8f8d] text-[14px]">{text}</p>
    </div>
  )
}
