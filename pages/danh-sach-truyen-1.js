import React from 'react'
import StoriesComponent from '../src/pages/Stories'
import HeaderServer from '../src/components/HeaderServer'
import * as Api from '../src/api/api'


const Stories = ({detail, canonical}) => {
  console.log('detail ====>', detail)
  return (
    <>
      <HeaderServer title={detail?.title || "Bộ sưu tập truyện hấp dẫn được tổng hợp từ Toidoc"} 
        description = {detail?.metaDescription || "Danh sách các truyện thuộc một thể loại mà bạn đang trọn như ngôn tình, kiếm hiệp, tiên hiệp, đam mỹ, sủng, ngược, huyền huyễn. Bạn có thể tự tạo bộ lọc riêng của bạn."}
        keywords={detail?.metaKeywords}
        canonical={canonical}
      />
      <StoriesComponent />
    </>
  )
}

Stories.getInitialProps = async (ctx) => {
  try {
    let detail = {}
    console.log('Stories.getInitialProps', ctx.query)
    if (ctx.query.theloai) {
      const result = await Api.get({
        url: typeof window !== 'undefined' ? 'https://api.toidoc.vn/data/private/data/categories/detail' : 'http://10.8.22.205:8082/private/data/categories/detail',
        params: {
          code: ctx.query.theloai,
        },
        isServer: true,
        hideError: true
      })


      detail = result.data
    }

    if (ctx.query.bosuutap) {
      const result = await Api.get({
        url: typeof window !== 'undefined' ? 'https://api.toidoc.vn/data/private/data/collection/detail' : 'http://10.8.22.205:8082/private/data/collection/detail',
        params: {
          slug: ctx.query.bosuutap,
        },
        isServer: true,
        hideError: true
      })


      detail = result.data
    }

    let canonical = 'https://toidoc.vn/'
    if (ctx.query.theloai) {
      canonical = canonical + '/danh-sach-truyen?theloai=' + ctx.query.theloai
    }
    
    if (ctx.query.top) {
      canonical = canonical + '/danh-sach-truyen?top=' + ctx.query.top
    }
   
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

export default Stories
