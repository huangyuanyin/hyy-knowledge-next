// 用于放大查看图片
export function zoomImage(imageUrl: string) {
  // 创建一个弹窗或模态框来显示大图
  const modal = document.createElement('div')
  modal.style.position = 'fixed'
  modal.style.top = '0'
  modal.style.left = '0'
  modal.style.width = '100%'
  modal.style.height = '100%'
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  modal.style.display = 'flex'
  modal.style.justifyContent = 'center'
  modal.style.alignItems = 'center'
  modal.style.overflow = 'hidden' // 隐藏溢出部分
  modal.style.zIndex = '9999'
  modal.style.cursor = 'zoom-out' // 鼠标移入时显示放大图标

  const image = document.createElement('img')
  image.src = imageUrl
  image.style.maxWidth = '90%'
  image.style.maxHeight = '90%'
  image.style.transition = 'transform 0.2s ease-in-out' // 添加过渡效果

  // 初始缩放比例
  let scale = 1.0

  // 点击图片外的区域关闭弹窗
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.remove()
    }
  })

  // 鼠标滚轮事件监听器，仅对图片进行缩放
  image.addEventListener('wheel', function (e: any) {
    e.preventDefault() // 阻止默认的滚动行为

    const delta = e.deltaY || e.detail || e.wheelDelta

    // 根据滚动方向调整缩放比例
    if (delta < 0) {
      // 放大图片
      scale += 0.1
    } else {
      // 缩小图片，但不小于原始尺寸
      scale = Math.max(0.1, scale - 0.1)
    }

    // 设置图片的缩放，同时保持背景固定
    image.style.transform = `scale(${scale})`
  })

  modal.appendChild(image)
  document.body.appendChild(modal)
}
