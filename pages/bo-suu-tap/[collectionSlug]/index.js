import React from 'react'
import StoriesComponent from '../../../src/pages/Stories'
import HeaderServer from '../../../src/components/HeaderServer'
import * as Api from '../../../src/api/api'


const Stories = ({detail, canonical}) => {
  return (
    <>
      <HeaderServer 
        title={detail?.title ? `🔥[HOT] ${detail?.title} | Nền tảng cộng đồng đọc truyện Online Toidoc` :  "Danh sách truyện hấp dẫn được tổng hợp từ Toidoc"} 
        description = {detail?.metaDescription || "Danh sách các bộ sưu tập truyện hấp dẫn. Bạn có thể dễ dàng tìm một loạt truyện theo bộ sưu tập như Thập niên 70, txvt, 1v1, quân nhân, ..."}
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
    if (ctx.query.collectionSlug) {
      const result = await Api.get({
        url: typeof window !== 'undefined' ? 'https://fsdfssf.truyenso1.xyz/data/private/data/collection/detail' : 'http://10.8.22.37:8082/private/data/collection/detail',
        // url: typeof window !== 'undefined' ? 'https://uatapi.truyenso1.xyz/data/private/data/collection/detail' : 'http://10.8.22.250:18111/data/private/data/collection/detail',
        params: {
          slug: ctx.query.collectionSlug,
        },
        isServer: true,
        hideError: true
      })
      detail = result.data
    }

    let canonical = 'https://toidoc.vn'
    if (ctx.query.collectionSlug) {
      canonical = canonical + '/bo-suu-tap/' + ctx.query.collectionSlug
    }
   
    return {
      detail,
      canonical,
    }
  } catch(e) {
    console.log('getCollectionDetail error', e)
    return {
      detail: {},
    }
  }
  
}

export default Stories
