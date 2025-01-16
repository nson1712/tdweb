import React from 'react'
import DtruyenComponent from '../../src/pages/DTruyens'
import HeaderServer from '../../src/components/HeaderServer'
import * as Api from '../../src/api/api'


const Dtruyen = ({detail, canonical}) => {
  return (
    <>
      <HeaderServer 
        title={"⭐ DTruyen, WebTruyen | Danh sách truyện điền văn hot nhất hiện nay "} 
        description = {'Danh sách truyện dtruyen, webtruyen, điền văn hot nhất hiện nay mà bạn không thể bỏ qua. Đây là tuyển tập được nhiều độc giả yêu thích và tìm kiếm với đa dạng các truyện có tình tiết hấp dẫn. Mời độc giả đón đọc ⭐⭐⭐⭐⭐'}
        keywords={'dtruyen, truyện dtruyen, webtruyen, truyện webtruyen, điền văn, truyện điền văn, truyen hot,'}
        canonical={canonical}
      />
      <DtruyenComponent />
    </>
  )
}

Dtruyen.getInitialProps = async (ctx) => {
  try {
    let detail = {}
    const result = await Api.get({
      url: typeof window !== 'undefined' ? 'https://api.toidoc.vn/data/private/data/categories/detail' : 'http://10.8.22.205:8082/private/data/categories/detail',
      params: {
        code: 'dien-van',
      },
      isServer: true,
      hideError: true
    })
    detail = result.data

    let canonical = 'https://toidoc.vn/dtruyen'
   
    return {
      detail,
      canonical,
    }
  } catch(e) {
    console.log('getCategoryDetail error', e)
    return {
      detail: {},
    }
  }
  
}

export default Dtruyen
