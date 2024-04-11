import './loading.css'

interface IProps {
  text?: string
  height?: string
}

export default function Loading(props: IProps) {
  const { text, height } = props

  return (
    <>
      <div className="loading-container" style={{ height: height || '175px' }}>
        <div className="scaling-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="mt-10px text-[#663399]">{text || '正在努力加载中...'}</span>
      </div>
    </>
  )
}
