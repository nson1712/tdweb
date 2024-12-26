import React from 'react'
import StoryDetailComponent from '../../../src/pages/StoryDetail'
import HeaderServerSchema from '../../../src/components/HeaderServerSchema'
import * as Api from '../../../src/api/api'

const StoryDetail = ({detail, canonical}) => {
  return (
    <>
      <HeaderServerSchema title={`${detail.seoTitle} | Truyện ${detail.storyTitle} mới nhất tại Toidoc`}
        description={detail.metaDescription ? detail.metaDescription.replace(/"/g,'') : detail.metaDescription}
        keywords={detail.metaKeywords}
        image={detail.coverImage}
        canonical={canonical}
        author={detail?.authorName}
        rating={detail ? ((detail?.rate == null || detail?.rate === 0) ? 4.3 : detail?.rate) : 4.3}
        slug={detail?.slug}
        totalView={detail ? ((detail?.totalView === 0 || detail?.totalView === null) ? 10 : detail?.totalView) : 10}
      />
      <StoryDetailComponent />
    </>
  )
}

StoryDetail.getInitialProps = async (ctx) => {
  try {
    if (ctx.query.storySlug !== 'images' && ctx.query.storySlug !== 'img') {
      const result = await Api.get({
        url: typeof window !== 'undefined' ? 'https://api.toidoc.vn/data/private/data/story/chapter/detail' : 'http://10.8.22.205:8082/private/data/story/chapter/detail',
        params: {
          storySlug: ctx.query.storySlug,
          chapterSlug: ctx.query.chapterSlug
        },
        isServer: true,
        hideError: true
      });

      const canonical = 'https://toidoc.vn/' + ctx.query.storySlug + '/' + ctx.query.chapterSlug
      return {
        detail: result.data,
        canonical: canonical,
      }
    }

    return {
      detail: {}
    }
    
  } catch(e) {
    return {
      detail: {},
    }
  }
  
}

export default StoryDetail
