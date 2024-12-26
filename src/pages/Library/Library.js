import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header/Header'
import StoryItem from '../../components/StoryItem/StoryItem'
import classNames from 'classnames'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import Button from '../../components/Button/Button'

const TABS = [{
  label: 'Đã xem',
  value: 'VIEWED'
}, {
  label: 'Đã lưu',
  value: 'SAVED'
}, {
  label: 'Lịch sử',
  value: 'HISTORY'
}]


const Library = () => {
  const [currentTab, setCurrentTab] = useState('VIEWED')
  const [page, setPage] = useState(1)

  const {
    bookmark,
    getBookMark,
    viewings,
    getStoryViewings,
    history,
    getStoryHistory,
    loadingStories,
    saveCustomerClickBanner
  } = StoryStore

  useEffect(() => {
    window.gtag("event", "page_view", {
      page_path: location.pathname,
    });
  }, [])

  useEffect(() => {

    if (currentTab === 'VIEWED') {
      getStoryViewings(page)
    }

    if (currentTab === 'SAVED') {
      getBookMark(page, 1000)
    }

    if (currentTab === 'HISTORY') {
      getStoryHistory(page)
    }

  }, [currentTab, page])

  const data = useMemo(() => {
    if (currentTab === 'VIEWED') {
      return viewings
    }
    if (currentTab === 'SAVED') {
      return bookmark
    }

    if (currentTab === 'HISTORY') {
      return history
    }

    return null
  }, [currentTab, viewings, bookmark, history])


  

  const handleLoadmore = () => {
    if (data && data?.totalPages > page) {
      setPage(page + 1)
    }
  }

  const handleClick = (e, code) => {
    // saveCustomerClickBanner(code)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, '_blank', 'Toidoc')
  };

  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'LIBRARY'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px]'>
          <div className='flex px-[24px] border-b-[1px] border-color mb-[8px]'>
            {TABS.map((tab) => (
              <a className={classNames('pb-[16px] mr-[32px] text-[14px] leading-[20px] label-text', currentTab === tab.value && 'text-active font-bold tab-active')} key={tab.value}
                onClick={() => {
                  setPage(1)
                  setCurrentTab(tab.value)
                }}
              >
                {tab.label}
              </a>
            ))}
          </div>
          { data && data.totalElements > 0
            ?
              <div className='px-[16px]'>
                {data?.data?.map((item, i) => (
                  <div className={classNames('py-[16px]', i !== data?.length - 1 && 'border-b-[1px] border-color')} key={item.id || item.storySlug}>
                    <StoryItem item={{...item, ...item.story}}
                      direction='row'
                      isBookMarked={currentTab === 'SAVED'}
                      currentChap={item.currentChapterOrder}
                      chapterSlug={item.chapterSlug}
                    />
                  </div>
                ))}

              {
                data && data.totalPages > page
                && <div className='max-w-[300px] w-full mx-auto mt-[40px] pb-[40px]'>
                <Button className='btnMain'
                  onClick={handleLoadmore}
                  loading={loadingStories}
                >
                  Xem thêm
                </Button>
              </div>
              }
            </div> : <div className='flex flex-col items-center justify-center empty'>
              <a onClick={(e) => handleClick(e, 'big-banner-library')}>
                <img src='https://media.truyenso1.xyz/ads/banner-truyen-31.png' className='imgBanner'/>
              </a>
              {/* <p className='label-text text-[16px] mb-0'>
              Không có thông tin
              </p> */}
            </div>
          
          
          }

          
        </div>
      </div>
    </CommonLayout>
  )
}

export default observer(Library)
