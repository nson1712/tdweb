import React from 'react'
import DtruyenComponent from '../../src/pages/DTruyens'
import HeaderServer from '../../src/components/HeaderServer'


const Dtruyen = ({}) => {
  return (
    <>
      <HeaderServer 
        title={"⭐ DTruyen, WebTruyen | Danh sách truyện điền văn hot nhất hiện nay "} 
        description = {'Danh sách truyện dtruyen, webtruyen, điền văn hot nhất hiện nay mà bạn không thể bỏ qua. Đây là tuyển tập được nhiều độc giả yêu thích và tìm kiếm với đa dạng các truyện có tình tiết hấp dẫn. Mời độc giả đón đọc ⭐⭐⭐⭐⭐'}
        keywords={'dtruyen, truyện dtruyen, webtruyen, truyện webtruyen, điền văn, truyện điền văn, truyen hot,'}
        canonical={'https://toidoc.vn/dtruyen'}
      />
      <DtruyenComponent />
    </>
  )
}

export default Dtruyen
