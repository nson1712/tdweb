import React from 'react'
import DtruyenComponent from '../../src/pages/DTruyens'
import HeaderServer from '../../src/components/HeaderServer'


const Truyenfull = ({}) => {
  return (
    <>
      <HeaderServer 
        title={"⭐ Truyenfull Toidoc | Truyện full mới hoàn được cập nhật đầy đủ "} 
        description = {'Khám phá danh sách truyện full hoàn hot nhất tại Toidoc, nơi tập hợp những tác phẩm được yêu thích và tìm kiếm nhiều nhất, đa dạng thể loại, cuốn hút từ chương đầu tiên! ⭐⭐⭐⭐⭐'}
        keywords={'truyenfull, truyenfull ngôn tình, đọc truyện full, truyenfull điền văn, truyenfull online, truyenfull vip, truyenfull dịch, truyện chữ truyenfull'}
        canonical={'https://toidoc.vn/webtruyen'}
      />
      <DtruyenComponent pageType={'Truyenfull'}/>
    </>
  )
}

export default Truyenfull
