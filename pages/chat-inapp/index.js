import React from 'react'
import ChatInApp from '../../src/pages/ChatInApp'
import HeaderServer from '../../src/components/HeaderServer'



const StoryType = () => {
  return (
    <>
      <HeaderServer 
        title="Danh sách thể loại truyện full Toidoc | Nền tảng cộng đồng đọc truyện Online Toidoc"
        description="Danh sách toàn bộ các thể loại truyện full online mà toidoc cung cấp. Bạn có thể xem danh sách các truyện có trong từng thể loại." 
        canonical='https://toidoc.vn/the-loai'/>
      <ChatInApp />
    </>
  )
}

export default StoryType
