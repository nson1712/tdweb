import React from 'react'
import StoryDetailComponent from '../../../src/pages/StoryDetail'
import HeaderServerSchema from '../../../src/components/HeaderServerSchema'
import axios from 'axios'
import { getAccessToken, getRefreshToken } from '../../../src/utils/storage'

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
      <StoryDetailComponent chapterTitle={detail?.seoTitle} storyTitle={detail?.storyTitle}/>
    </>
  )
}

StoryDetail.getInitialProps = async(ctx) => {
  const getDetail = async() => {
    try {
      if (ctx.query.storySlug !== 'images' && ctx.query.storySlug !== 'img') {
        const result = await axios.get(
        typeof window !== 'undefined' ? 'https://uatapi.truyenso1.xyz/data/private/data/story/chapter/detail' : 'https://uatapi.truyenso1.xyz/data/private/data/story/chapter/detail',
        {
          params: {
            storySlug: ctx.query.storySlug,
            chapterSlug: ctx.query.chapterSlug
          },
        });
        const canonical = 'https://toidoc.vn/' + ctx.query.storySlug + '/' + ctx.query.chapterSlug;

        console.log('SEO chapter detail: ', result.data);
        return {
          detail: result.data?.data,
          canonical: canonical,
        }
      }

      return {
        detail: {}
      }
      
    } catch(e) {
      console.log('Error get chapter detail: ', e);
      return {
        detail: {},
      }
    }
  }

  return await getDetail()
}

export default StoryDetail
