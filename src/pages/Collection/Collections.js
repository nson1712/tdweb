import { observer } from 'mobx-react'
import React, { useEffect, useState, useMemo } from 'react'
import Header from '../../components/Header/Header'
import StoryStore from '../../stores/StoryStore'
import CollectionItem from '../Research/CollectionItem'
import GlobalStore from '../../stores/GlobalStore'

let timeout;
const Collections = () => {
  const [page, setPage] = useState(1)
  const { collectionData, getCollections } = StoryStore
 
  useEffect(() => {
    getCollections(page, 20)
  }, [page])

  useEffect(() => {
    const checkLogin = async() => {
      await GlobalStore.checkIsLogin();
    }
    checkLogin();
  }, [])

  // const data = useMemo(() => {
  //     return collectionData
  // }, [collectionData])

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
  }, [collectionData])

  const handleLoadmore = () => {
    if (collectionData && collectionData?.totalElements > 0 &&  collectionData?.totalPages > page) {
      setPage(page + 1)
      console.log('page1: ', page)
    }
  }

  return (
    <>
      <div className='relative'>
        <div className='hidden md:block'>
          <Header selectedTab={'HOME'}/>
        </div>
      
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px] min-h-[100vh] flex flex-col justify-center'>
          <p className='text-[20px] leading-[24px] font-bold main-text mb-[8px] ml-[20px]'>
            Danh sách bộ sưu tập mới nhất
          </p>

          <div className='mx-auto flex items-center flex-wrap px-[16px]'>
            <div className='flex items-start flex-wrap mb-[20px]'>
              {collectionData?.data?.map((item) => (
                <div className='p-[8px] w-[50%] mt-[10px]' key={item.id}>
                  <CollectionItem item={item}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(Collections)
