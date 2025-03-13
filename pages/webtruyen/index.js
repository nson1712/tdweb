import React from 'react'
import DtruyenComponent from '../../src/pages/DTruyens'
import HeaderServer from '../../src/components/HeaderServer'


const WebTruyen = ({}) => {
  return (
    <>
      <HeaderServer 
        title={"⭐ WebTruyen Toidoc | Truyện full mới được cập nhật liên tục "} 
        description = {'Khám phá danh sách truyện hot nhất trên Webtruyen, nơi tập hợp những tác phẩm được yêu thích và tìm kiếm nhiều nhất. Thưởng thức ngay những câu chuyện hấp dẫn, đa dạng thể loại, cuốn hút từ chương đầu tiên! ⭐⭐⭐⭐⭐'}
        keywords={'webtruyen, webtruyen online, webtruyen vip, webtruyen free, webtruyen top, truyện webtruyen, đọc truyện webtruyen'}
        canonical={'https://toidoc.vn/webtruyen'}
      />
      <DtruyenComponent pageType={'WebTruyen'}/>
    </>
  )
}

export default WebTruyen
