import React, { useEffect, useMemo, useState } from 'react'
import StoryItem from '../../components/StoryItem/StoryItem'
import Router, { useRouter } from 'next/router'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import ModalComponent from '../../components/Modal'
import classNames from 'classnames'
import { convertObjectToSearchParams } from '../../utils/utils'
import Head from 'next/head'


const SORTS = [{
  label: 'Phổ biến',
  value: 'popular'
}, {
  label: 'Hot nhất',
  value: 'hot'
}, {
  label: 'Mới nhất',
  value: 'newest'
}, {
  label: 'Cũ nhất',
  value: 'oldest'
}]


const STATUS = [{
  label: 'Tất cả',
  value: 'all'
}, {
  label: 'Đã hoàn thành',
  value: 'active'
}, {
  label: 'Đang ra',
  value: 'pending'
}]

const CHAPTERS = [{
  label: 'Tất cả',
  value: 'all'
}, {
  label: '<50',
  value: '0-50'
}, {
  label: '50-100',
  value: '50-100'
}, {
  label: '100-200',
  value: '100-200'
}, {
  label: '200-500',
  value: '200-500'
}, {
  label: '500-1000',
  value: '500-1000'
}, {
  label: '>1000',
  value: '1000-500000'
}]

let timeout;

const Stories = () => {
  const route = useRouter()

  const [page, setPage] = useState(1)
  const [last, setLast] = useState()

  const { 
    storyByCategory, 
    getStoryByCategory
  } = StoryStore

  useEffect(() => {
    const filterParams = {
      sort: 'hot'
    }
    getStoryByCategory('dien-van', last, 20, filterParams)
  }, [])


  const data = useMemo(() => {

    return storyByCategory['dien-van']

  }, [storyByCategory])

  useEffect(() => {
    const trackScrolling = () => {
      clearTimeout(timeout)
      timeout = setTimeout(async () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const isBottom = windowBottom >= docHeight - 600

        if (isBottom) {
          handleLoadmore()
        }
      }, 0)
    }
    window.addEventListener('scroll', trackScrolling);

    return () => {
      window.removeEventListener('scroll', trackScrolling);
    }
  }, [data])

  const handleLoadmore = () => {
    if (data && data?.totalElements > 0 && data?.totalPages > page) {
      setPage(page + 1)
    }
    if (data && data.hasNext) {
      setLast(data.last)
    }
  }

  return (
    <CommonLayout>
    <div>
      <div className='hidden md:block'>
        <Header />
      </div>
      <div className='max-w-[768px] mx-[auto] md:pt-[80px] md:bg-white pt-[64px]'>
        <div className='flex items-center justify-between fixed md:static top-0 left-0 right-0 bg-white'>
          <div className='flex items-center'>
           

            <a className='p-[20px]' title="Nền tảng cộng đồng đọc truyện online hấp dẫn"
              href='/tim-kiem'
              onClick={() => {
                if (route.query.from === 'ads') {
                  Router.push('/tim-kiem')
                } else {
                  Router.back()
                }
                
              }}
            >
              <img src='/images/arrow-left.svg' className='w-[24px]' alt="Nền tảng cộng đồng đọc truyện online hấp dẫn"/>
            </a>
            

            <h1 className='text-[16px] leading-[20px] font-bold main-text mb-0'>{'Danh sách truyện dtruyen|webtruyen, điền văn'}</h1>
          </div>
          

          <a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full mr-[20px]' title="Tìm kiếm truyện full hay, truyện ngôn tình, tiên hiệp, kiếm hiệp"
            // onClick={() => {
            //   Router.push(`/tim-kiem-truyen`)
            // }}
            href='/tim-kiem-truyen'
          >
            <img src='/images/ic_search.svg' className='w-[24px]' alt="Tìm kiếm truyện full hay, truyện ngôn tình, tiên hiệp, kiếm hiệp"/>
          </a>
        </div>

        <div className='px-[16px] md:pt-0 flex flex-wrap flex-row pt-[10px]'>
          {data?.data?.map((item, i) => (
            <div className='py-[8px] w-[50%]' key={`${item.id}-${i}`}>
              <StoryItem item={item}
                direction='row'
                fromSearch={true}
              />
            </div>
          ))}
          
        </div>
      </div>
    </div>
    </CommonLayout>
  )
}

export default observer(Stories)
