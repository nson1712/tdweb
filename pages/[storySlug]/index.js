import React from 'react'
import StorySummaryComponent from '../../src/pages/StorySummary'
import HeaderServerSchema from '../../src/components/HeaderServerSchema'
import axios from 'axios'
import { countWords } from '../../src/utils/utils'

const StorySummary = ({detail, article, canonical}) => {
  return (
    <>
      <HeaderServerSchema title={`✅ ${(detail?.status === 'ACTIVE' ? '[FULL] ' : '') + detail?.title}${countWords(detail?.title) <= 70 ? '| Nền tảng cộng đồng đọc truyện online hấp dẫn' : ''}`}
        description={detail?.metaDescription ? detail?.metaDescription.replace(/"/g,'') : detail?.metaDescription}
        keywords={detail?.metaKeywords}
        image={detail?.thumbnail || detail?.coverImage}
        canonical={`https://toidoc.vn/${canonical}`}
        author={detail?.author?.name}
        rating={detail ? ((detail?.rate == null || detail?.rate === 0) ? 4.3 : detail?.rate) : 4.3}
        slug={detail?.slug}
        totalView={detail ? ((detail?.totalView === 0 || detail?.totalView === null) ? 10 : detail?.totalView) : 10}
      />
      <StorySummaryComponent storyDetail={detail} articleDetail={article}/>
    </>
  )
}

StorySummary.getInitialProps = async (ctx) => {
  const getDetail = async () => {
    try {
      if (ctx.query.storySlug !== 'images' && ctx.query.storySlug !== 'img') {
        // const result = await axios.get(
        // typeof window !== 'undefined' ? `https://fsdfssf.truyenso1.xyz/data/private/data/story/detail?slug=${ctx.query.storySlug}` : `http://10.8.22.205:8082/private/data/story/detail?slug=${ctx.query.storySlug}`)
        const result = await axios.get(`https://fsdfssf.truyenso1.xyz/data/private/data/story/detail?slug=${ctx.query.storySlug}`)
        // typeof window !== 'undefined' ? `https://uatapi.truyenso1.xyz/data/private/data/story/detail?slug=${ctx.query.storySlug}` : `http://10.8.22.250:18111/data/private/data/story/detail?slug=${ctx.query.storySlug}`)
        // console.log('Result: ', result);
        // const resultBlog = await axios.get(typeof window !== 'undefined' ? `https://fsdfssf.truyenso1.xyz/data/article/story/${ctx.query.storySlug}` : `http://10.8.22.205:8082/article/story/${ctx.query.storySlug}`);
        const resultBlog = await axios.get(`https://fsdfssf.truyenso1.xyz/data/article/story/${ctx.query.storySlug}`);
        return {
          detail: result?.data?.data,
          article: resultBlog?.data?.data,
          canonical: ctx.query.storySlug
        }
      }
      return {
        detail: {},
        article: {},
        canonical: ctx.query.storySlug
      }
    } catch(e) {
      console.log('server call error', e)
      return {
        detail: {},
        article: {},
        canonical: ctx.query.storySlug
      }
    }
  }

  return await getDetail()
  
}

export default StorySummary
