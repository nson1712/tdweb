import React from 'react'
import StoryTypeComponent from '../src/pages/StoryType'
import HeaderServer from '../src/components/HeaderServer'



const StoryType = () => {
  return (
    <>
      <HeaderServer description="Danh sách toàn bộ các thể loại truyện full online mà toidoc cung cấp. Bạn có thể xem danh sách các truyện có trong từng thể loại." 
      canonical='https://toidoc.vn/the-loai'/>
      <StoryTypeComponent />
    </>
  )
}

export default StoryType
