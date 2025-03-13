import React from 'react'
import DtruyenComponent from '../../src/pages/DTruyens'
import HeaderServer from '../../src/components/HeaderServer'


const Dtruyen = ({}) => {
  return (
    <>
      <HeaderServer 
        title={"⭐ DTruyen Toidoc | Top truyện điền văn hot nhất hiện nay "} 
        description = {'Top truyện điền văn DTruyen hot nhất, được đông đảo độc giả yêu thích và săn đón. Những câu chuyện hấp dẫn, nội dung cuốn hút, đa dạng thể loại đang chờ bạn khám phá. Đọc ngay! ⭐⭐⭐⭐⭐'}
        keywords={'dtruyen, truyện dtruyen, đọc truyện dtruyen, điền văn, truyện điền văn, truyen hot,'}
        canonical={'https://toidoc.vn/dtruyen'}
      />
      <DtruyenComponent pageType={'Dtruyen'}/>
    </>
  )
}

export default Dtruyen
