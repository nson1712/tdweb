import React from 'react'
import CollectionComponent from '../../src/pages/Collection'
import HeaderServer from '../../src/components/HeaderServer'
import Blog from '../../src/pages/Blog'

const StoryType = () => {
  return (
    <>
      <HeaderServer 
        description="Danh sách các bộ sưu tập truyện hấp dẫn được cập nhật thường xuyên từ độc giả. Bạn có thể đắm chìm trong 1 loạt truyện theo 1 motip riêng như Thập niên 70, txvt, 1v1, quân nhân, vả mặt, cưới trước yêu sau, ..." 
        title="Danh sách bộ sưu tập truyện chữ hấp dẫn | Nền tảng cộng đồng đọc truyện Online Toidoc"
        canonical='https://toidoc.vn/bo-suu-tap'/>
      <CollectionComponent />
      <Blog />
    </>
  )
}

export default StoryType
