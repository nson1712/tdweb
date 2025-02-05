import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import Header from '../../components/Header/Header'
import SlideStories from '../../components/SlideStories'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import StoryStore from '../../stores/StoryStore'
import ChatSupport from '../../components/Button/ChatSupport'
import HotStories from './HotStories'
import ModalComponent from '../../components/Modal/Modal'
import Feedback from './Feedback'
import StoryItem from '../../components/StoryItem/StoryItem'
import GlobalStore from '../../stores/GlobalStore'
import { setItem, getItem } from '../../utils/storage'
import { IssuesCloseOutlined } from '@ant-design/icons'

const Homepage = () => {
  const {
    lastestStory,
    getLastStory,
    getStoryByCategory,
    storyByCategory,
    favouriteCategories,
    getFavouriteCategories,
    topTrending,
    getTopTrending,
    categories,
    getCategories,
    saveFavoriteCategories,
    hotStories,
    getHotStories,
    toidocStories,
    getToidocStories,
    saveCustomerClickBanner,
    checkCustomerClickAff,
    recordClickAff
  } = StoryStore
  const [showLastestStory, setShowLastestStory] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLastestStory(false)
    }, 60000)
  }, [])

  useEffect(() => {
    const checkCustomerClickAffLocal = async() => {
      // const isClickAff = await checkCustomerClickAff(localStorage.getItem('DEVICE_ID'))
      // if (!isClickAff) {
      //   
      // }
      const isShowBanner = await shouldShowBanner();
      if (isShowBanner) {
        setShowModal(true)
      }
    }

    setTimeout(() => {
      // const selectedCategoriesStore = localStorage.getItem('SELECTED_CATEGORIES')

      // if (!selectedCategoriesStore) {
        // Router.replace('/the-loai-yeu-thich')
        // const defaultCategories = ['ngon-tinh','sung','nguoc','tien-hiep'];
        // setSelectedCategories(defaultCategories.split(','))
        // saveFavoriteCategories(defaultCategories);
        // localStorage.setItem('SELECTED_CATEGORIES', defaultCategories.join(','));
        // getFavouriteCategories();
        // selectedCategories.forEach((category) => {
        //   getStoryByCategory(category, undefined, 10, {sort: 'hot'})
        // })
      // } else {
      //   setSelectedCategories(selectedCategoriesStore.split(','))
      // }
      // checkCustomerClickAffLocal();
      
      
    }, 2000)
    
  }, [])

  const handleSaveCategoies = async () => {
    // await saveFavoriteCategories(selectedCategories)
    // localStorage.setItem('SELECTED_CATEGORIES', selectedCategories.join(',')),
    // getFavouriteCategories()
    // selectedCategories.forEach((category) => {
    //   getStoryByCategory(category, undefined, 10, {sort: 'hot'})
    // })
  }

  const shouldShowBanner = async() => {
    const lastClosed = await getItem('bannerClosedAt');
    if (!lastClosed) return true;

    const today = new Date().toISOString().split('T')[0];
    return lastClosed !== today;
  }

  // Hàm lưu trạng thái đóng banner
  const closeBanner = async() => {
    const today = new Date().toISOString().split('T')[0];
    await setItem('bannerClosedAt', today);
    setShowModal(false);
  }

  const handleClick = async(e, code) => {
    // saveCustomerClickBanner(code)
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'HOME')
    await closeBanner();
    if (code === 'tai-app-home') {
      window.open('https://toidoc.onelink.me/59bO/d42503wz', '_blank', 'Toidoc')
    } else {
      
      window.open(`https://www.facebook.com/toidoc.support/posts/pfbid02FE94wAvXZLq3cAVT3TSppkFLM8uabRcJ8AwMuHa9LYdbCFM7TfnpqW1crVnadNPel`, '_blank', 'Toidoc')
    }
  }

  const handleCloseModal = async(code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'HOME')
    // window.open(`https://shope.ee/7UsvLxx7Ui`, '_blank', 'Toidoc')
    if (code === 'aff') {
      await closeBanner();
    } else {
      setShowFeedback(false)
    }
  }

  useEffect(() => {
    // const selectedCategoriesStore = localStorage.getItem('SELECTED_CATEGORIES');
    // const defaultCategories = ['ngon-tinh','sung','nguoc','tien-hiep'];
    // const list = selectedCategoriesStore ? selectedCategoriesStore.split(',') : defaultCategories
    // if (!selectedCategoriesStore) {
    //   saveFavoriteCategories(defaultCategories)
    //   localStorage.setItem('SELECTED_CATEGORIES', defaultCategories.join(','));
    // }

    // list.forEach((category) => {
    //   getStoryByCategory(category, undefined, 20, {sort: 'hot'})
    // })

    // getLastStory()

    // getFavouriteCategories()

    // getTopTrending()

    // getCategories()

    // getHotStories()

    getToidocStories(1, 100)
  }, [])

  const selectedCategoryName = useMemo(() => {
    return categories?.filter((item) => selectedCategories.indexOf(item.code) !== -1)?.map((item) => item.name)?.join(',')
  }, [selectedCategories, categories])

  return (
    <CommonLayout active='HOME'>
      <div>
        <Header selectedTab={'HOME'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white md:pt-[88px] px-0 md:px-[8px]'>
          <div>
            
            <div className='home-content pt-[16px] md:pt-0'>
              <div className='flex items-center justify-between px-[20px] mb-[16px]'>
                <p className='mb-0 text-[14px] font-semibold label-text'>
                  Xin chào, <b className='main-text text-[15px]'>{GlobalStore.profile?.displayName || 'bạn'}</b>
                </p>

                <div className='flex items-center'>
                  <a className='w-[100px] h-[32px] flex items-center justify-center rounded-full download-btn text-white pr-[10px] mr-[10px]'
                      onClick={(e) => handleClick(e, 'tai-app-home')} >
                    <img src='/images/download-arrow.png' className='w-[24px]' alt='Góp ý truyện fulll' title='Góp ý truyện full'/>
                    Tải app
                  </a>
                  <a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full'
                    onClick={() => {
                      window.open(`https://m.me/185169981351799?text=Mình đang đọc truyện trên web. Hỗ trợ giúp mình với.`, "_blank", "Toidoc");
                    }}
                  >
                    <img src='/images/ic_feedback.svg' className='w-[24px]' alt='Góp ý truyện fulll' title='Góp ý truyện full'/>
                  </a>
                  <a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full ml-[20px]'
                    // onClick={() => {
                    //   Router.push(`/tim-kiem-truyen`)
                    // }}
                    href='/tim-kiem-truyen' title='Tìm kiếm các thể loại truyện full hay'
                  >
                    <img src='/images/ic_search.svg' className='w-[24px]' alt='Tìm kiếm các thể loại truyện full hay' title='Tìm kiếm các thể loại truyện full hay'/>
                  </a>
                </div>
              </div>
              {/* <HotStories data={topTrending?.data?.slice(0, 10)}/> */}
              <div className='px-[8px] flex flex-row flex-wrap'>
                {toidocStories?.data?.map((item, i) => (
                  <div key={i} className='px-[8px] w-[25%] md:w-[25%] py-[8px]'>
                    <StoryItem item={item} fromSlide={true}/>
                  </div>
                ))}
              </div>
              {/* <SlideStories
                  title='Truyen HOT Toidoc' 
                  data={toidocStories?.data?.slice(0, 100)}
                  url={`/danh-sach-truyen/hot`}
                /> */}
              {/* <div className='mb-[20px]'>
                <SlideStories
                  title='Truyen HOT Toidoc'
                  data={hotStories?.slice(0, 20)}
                  url={`/danh-sach-truyen/hot`}
                />
              </div>
              { favouriteCategories?.map((category) => (
                  <div className='mb-[32px]' key={category.categoryCode}>
                    <SlideStories
                      title={category.categoryName}
                      data={storyByCategory[category.categoryCode]?.data?.slice(0, 20)}
                      categoryCode={category.categoryCode}
                    />
                  </div>
              )) } */}

              { favouriteCategories?.length > 0 && favouriteCategories?.length <= 5 && selectedCategories?.length > 0
                 && <>
                  <p className='text-[20px] leading-[24px] font-bold main-text mb-[8px] text-center'>
                    Đa dạng hóa trang chủ của bạn
                  </p>
                  <p className='text-[14px] leading-[17px] label-text mb-[24px] text-center'>
                    Thêm những lựa chọn yêu thích khác
                  </p>

                  <div className='mx-auto flex items-center flex-wrap px-[16px]'>
                    { categories?.map((category) => (
                      <a className={classNames('p-[16px] flex items-center justify-center text-[14px] main-text font-medium rounded-[24px] bg-primary2 m-[4px] category',
                        selectedCategories.indexOf(category.code) !== -1 && 'text-white bg-active category-active')} title={`Truyện ${category.name}`}
                        key={category.code}
                        onClick={() => {
                          setSelectedCategories((prev) => {
                            if (prev.indexOf(category.code) !== -1) {
                              return prev.filter((cate) => cate !== category.code)
                            }
                            return [...prev, category.code]
                          })
                        }}
                      >
                        {category.name}
                      </a>
                    )) }
                  </div>
                  <div className='mt-[24px] max-w-[340px] w-full mx-auto'>
                    <a className='btnMain' title={`Lưu thê loại truyện ${selectedCategoryName}`}
                      onClick={handleSaveCategoies}
                    >
                      Lưu
                    </a>
                  </div>
                </>
           
              }
             
            </div>
          
            { lastestStory?.storySlug && showLastestStory
              && <div className='flex items-center story-box pl-[16px] fixed md:fixed left-[16px] bottom-[86px] md:bottom-[30px] right-[16px] md:right-auto cursor-pointer'>
              <a className='flex-1' href={`/${lastestStory.storySlug}/${lastestStory.chapterSlug}`} title={` Truyện ${lastestStory?.story?.title}`}
                // onClick={() => {
                //   Router.push(`/${lastestStory.storySlug}/${lastestStory.chapterSlug}`)
                // }}
              >
                <p className='text-[12px] label-text leading-[16px] font-medium mb-[4px]'>
                  Đọc tiếp | { Math.round((lastestStory?.currentChapterOrder / lastestStory?.story.totalChapter) * 100)}% hoàn thành
                </p>
                <p className='text-[14px] leading-[16px] text-white font-semibol mb-0' >
                  {lastestStory?.story?.title}
                </p>
              </a>
              <a className='p-[16px]'
                onClick={() => {
                  setShowLastestStory(false)
                }}
              >
                <img src='/images/x.svg' className='w-[24px]'/>
              </a>
            </div>
            }
            
            
          </div>
        </div>

        {/*<ModalComponent
          show={showFeedback}
          title="Gửi góp ý"
          handleClose={() => {
            setShowFeedback(false)
          }}
        >
          <Feedback
            handleClose={(e) => handleCloseModal('feedback')}
          />
        </ModalComponent>*/}

        {showModal && <ModalComponent
          show={showModal}
          handleClose={(e) => handleCloseModal('aff')}
          isCountDown={false}
          countDownTime={5}
        >
          <a onClick={(e) => handleClick(e, 'big-banner')}>
            <img src='https://media.truyenso1.xyz/ads/banner-lixi-tet-1.png' className='imgBanner'/>
          </a>
        </ModalComponent>}
        <ChatSupport showChat={showChat} setShowChat={setShowChat} />
      </div>
      
      
    </CommonLayout>
  )
}

export default observer(Homepage)
