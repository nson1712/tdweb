import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Button from '../../components/Button/Button'
import { formatStringToNumber } from '../../utils/utils'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import classNames from 'classnames'
import Link from 'next/link'
import MobileHeader from '../../components/Header/MobileHeader'
import Header from '../../components/Header/Header'
import Chapters from '../StoryDetail/Chapters'
import MobileShare from './MobileShare'
import LaunchCountdown from "../../components/LaunchCountdown";
import { getMobileOperatingSystem } from "../../utils/utils";
import ModalComponent from '../../components/Modal/Modal'
import ChatSupportAutoClose from '../../components/Button/ChatSupportAutoClose'
import PaginatedList from './PaginatedList'
import GlobalStore from '../../stores/GlobalStore'

const TABS = [{
  label: 'Nội dung',
  value: 'CONTENT'
}, {
  label: 'Mục lục',
  value: 'CHAPTERS'
}]

let timeout;
let isMobile = true;

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? <span dangerouslySetInnerHTML={{ __html: (text ? text.slice(0, 370) : '') + '...' }} /> : <span dangerouslySetInnerHTML={{ __html: text }} />}
      <span onClick={toggleReadMore} className="read-or-hide" >
        {isReadMore ? <span className='detail-story-short-description-xem-them-click' dangerouslySetInnerHTML={{ __html: "<br/><span className='btn-view-more'>Xem thêm</span>" }} /> : <span dangerouslySetInnerHTML={{ __html: "<br/>Thu gọn" }} />}
      </span>
    </p>
  );
};

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    isMobile = getMobileOperatingSystem();
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

const StorySummary = () => {
  const scrollDirection = useScrollDirection();
  const [showBubble, setShowBubble] = useState("up");
  const [scrollOffset, setScrollOffset] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0)
  const [showChapter, setShowChapter] = useState(false)
  const [time, setTime] = useState(180)
  const [showModal, setShowModal] = useState(false)
  const [showModalApp, setShowModalApp] = useState(false)
  const [popupUrl, setPopUpUrl] = useState('/images/download-app/popup-1.png')
  const [orderPopupUrl, setOrderPopupUrl] = useState(1)
  const { storyDetail, getStoryDetail, saveBookMark, bookmarkIds, unBookMark,
    getChapterDetail,
    loadingChapterDetail,
    getReadingLatestChapter,
    latestReadingChapter,
    saveViewStory,
    saveCustomerClickBanner,
    checkCustomerClickAff,
    recordClickAff
  } = StoryStore
  const [currentChapterDetail, setCurrentChapterDetail] = useState([]);

  const [currentTab, setCurrentTab] = useState('CONTENT')
  const [chapters, setChapters] = useState([])

  const route = useRouter()

  // useEffect(() => {
  //   if (route.query.storySlug && chapters && chapters?.length > 0) {
  //     saveViewStory(route.query.storySlug)
  //   }
  // }, [route.query.storySlug, chapters])

  // useEffect(() => {
  //   if (chapters && chapters.length > 0 && storyDetail) {
  //     const currentChappter = chapters[chapters.length - 1]

      // saveLastStory({
      //   storySlug: route.query.storySlug,
      //   chapterSlug: currentChappter?.slug,
      //   currentChapterOrder: currentChappter.order,
      //   status: chapters.length === storyDetail?.chapters?.length ? 'READ_FINISH' : "VIEWING",
      //   chapterDetailId: currentChappter.id
      // })
  //   }
  // }, [chapters, route.query.storySlug, storyDetail])

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [])

  // useEffect(() => {
  //     // Disable right-click (context menu)
  //     const disableContextMenu = (event) => event.preventDefault();
  //     document.addEventListener('contextmenu', disableContextMenu);
    
  //     // Disable copying (Ctrl+C, Cmd+C, etc.)
  //     const disableCopy = (event) => {
  //       event.clipboardData.setData('text/plain', 'Copying is not allowed.');
  //       event.preventDefault();
  
  //     };
  //     document.addEventListener('copy', disableCopy);
    
  //     // Cleanup on unmount
  //     return () => {
  //       document.removeEventListener('contextmenu', disableContextMenu);
  //       document.removeEventListener('copy', disableCopy);
  //     };
  //   }, []);


  // useEffect(() => {
  //   ; (window.adsbygoogle = window.adsbygoogle || []).push({})
  // }, [])

  // const checkCustomerClickAffLocal = async() => {
    // const isClickAff = await checkCustomerClickAff(localStorage.getItem('DEVICE_ID'))
    // if (!isClickAff) {
    //   setShowModal(true)
    // }
  // }

  useEffect(() => {
    const fetchData = async() => {
      if (route.query.storySlug) {
        await getStoryDetail(route.query.storySlug);
        const isLoggedIn = await GlobalStore.checkIsLogin();
        if (isLoggedIn) {
          await getReadingLatestChapter(route.query.storySlug);
        }
      }
    }
    fetchData();
  }, [route.query.storySlug])

  // useEffect(() => {
  //   const getFirstChapter = async () => {
  //     const result = await getChapterDetail(route.query.storySlug, storyDetail.chapters[0].slug)
  //     setChapters([{
  //       ...storyDetail.chapters[0],
  //       chapterDetail: result
  //     }])
  //     setCurrentChapterDetail(result);
  //   }
  //   if (storyDetail?.id && storyDetail.chapters && storyDetail.chapters[0]) {
  //     getFirstChapter()
  //   }
  // }, [storyDetail?.id])

  // useEffect(() => {
  //   const trackScrolling = () => {
  //     clearTimeout(timeout)
  //     timeout = setTimeout(async () => {
  //       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  //       const body = document.body;
  //       const html = document.documentElement;
  //       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //       const windowBottom = windowHeight + window.pageYOffset;
  //       const isBottom = windowBottom >= docHeight - 600;
  //       const isEndChapter = window.pageYOffset === 100;

  //       setScrollOffset(window.pageYOffset)

  //       if (isBottom && storyDetail.chapters && storyDetail.chapters[chapters.length] && !loadingChapterDetail) {
  //         if (time <= 0) {
  //           setTime(180)
  //         }
  //         if (orderPopupUrl >= 4) {
  //           setOrderPopupUrl(1)
  //         }
  //         const newUrl = `/${route.query.storySlug}/${storyDetail.chapters[chapters.length]?.slug}`

  //         window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

  //         const result = await getChapterDetail(route.query.storySlug, storyDetail.chapters[chapters.length]?.slug)
  //         setChapters(prev => {
  //           if (prev[prev.length - 1]?.id !== storyDetail.chapters[chapters.length]?.id) {
  //             return [...prev, {
  //               ...storyDetail.chapters[chapters.length],
  //               chapterDetail: result
  //             }]
  //           }

  //           return prev

  //         })
  //         setCurrentChapterDetail(result);
  //         setShowBubble('up');

  //         window.gtag("event", "page_view", {
  //           page_path: location.pathname,
  //         });
         
  //         setPopUpUrl(`/images/download-app/popup-${orderPopupUrl}.png`)
  //         setOrderPopupUrl(orderPopupUrl => orderPopupUrl + 1)
  //       }


  //     }, 100)
  //   }
  //   window.addEventListener('scroll', trackScrolling);

  //   return () => {
  //     window.removeEventListener('scroll', trackScrolling);
  //   }
  // }, [chapters, storyDetail, loadingChapterDetail])

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(time => time !== 0 ? time - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  const handleSetFavorite = async () => {
    if (route.query.storySlug) {

      if (bookmarkIds.indexOf(storyDetail.id) === -1) {
        await saveBookMark(route.query.storySlug, storyDetail.id)
      } else {
        await unBookMark(route.query.storySlug, storyDetail.id)
      }

    }

  }

  const handleReadingNow = () => {
    
    if (latestReadingChapter) {
      console.log('handleReadingNow latestReadingChapter');
      Router.push(`/${latestReadingChapter.storySlug}/${latestReadingChapter.chapterSlug}`)
    } else if (storyDetail?.chapters?.length > 0) {
      console.log('handleReadingNow');
      Router.push(`/${storyDetail.slug}/${storyDetail?.chapters[0].slug}`);
    }
  }
  const handleClick = (e, code) => {
    setShowModalApp(false)
    // saveCustomerClickBanner(code)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, '_blank', 'Toidoc')
  };

  const handleClickShortDescription = (e, code) => {
    // saveCustomerClickBanner(code)
    window.open(`https://shopee.vn/m/sale-cuoi-thang-don-luong-ve`, '_blank', 'Toidoc')
  };

  const handleCloseModal = async(code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY_CLOSE')
    setShowModal(false)
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY_CLOSE')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  }

  const handleClickShopee = async() => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY')
    setShowModal(false)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, '_blank', 'Toidoc')
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
    
  }

  // useEffect(() => {
  //   console.log('currentChapterDetail.length: ' + currentChapterDetail.length)
  //   if (chapters?.length > 0 && currentChapterDetail.length > 6) {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   }

  // }, [chapters])

  return (
    <CommonLayout>
      <div className='hidden md:block'>
              <Header />
            </div>
      <div className='max-w-[620px] mx-[auto] pt-[40px] bg-story'>
        <div className={classNames('flex items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 top-0 z-[99] bg-white mobile-header', scrollOffset > 100 && 'mobile-header-show', `${scrollDirection === 'down' ? 'hide' : 'show-header'}`)}>
          <a className='p-[10px]' title={`Truyện ${storyDetail?.title}`}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            }}
          >
            <img src='/images/arrow-left.svg' className='w-[24px]' />
          </a>

          <a href={`/${storyDetail?.slug}`} title={`Truyện ${storyDetail?.title}`}>
            <h1 className='text-[18px] leading-[20px] font-bold main-text mb-0 line-clamp-1'>{storyDetail?.title}</h1>
          </a>

          <div className='hidden md:block w-[68px]' />

          <a className='w-[68px] p-[10px] md:hidden' title={`Danh sách chương - ${storyDetail?.title}`}
            onClick={() => {
              setShowChapter(true)
            }}
          >
            <img src='/images/checkmark.svg' className='w-[24px]' />
          </a>
        </div>

        <MobileHeader show={scrollOffset <= 100} />
        <div style={{'marginTop': '14px'}} dangerouslySetInnerHTML={{__html: `<a id='link-video-header' href='https://toidoc.onelink.me/59bO/d42503wz'> <video autoplay loop muted playsinline><source src='https://media.truyenso1.xyz/ads/top-banner.mp4' type='video/mp4' rel='nofollow'/></video> </a>`}} />
        <div className='h-[200px] relative mb-[20px]'>
          <div className='bg-story-summary' />
          <img src={storyDetail.coverImage} alt={`Truyện ${storyDetail.title}`} title={storyDetail.title} className='w-full h-[200px] object-cover' />
          <div className='absolute left-0 right-0 bottom-0 top-0 summary-banner z-[2] flex flex-col justify-between px-[20px] pt-[10px] pb-[30px]'>
            <div className='relative flex items-center justify-between'>
              <a className='relative z-[2]' title={`Nền tảng cộng đồng đọc truyện toidoc.vn`}
                onClick={() => {
                  Router.back()
                }}
              >
                <img src='/images/arrow-white.svg' className='w-[24px]' alt='black' />
              </a>
              <p className='absolute top-0 right-0 left-0 bottom-0 text-[16px] font-bold text-white text-center mb-0 leading-[32px] px-[80px]'>
                {/* Chi tiết */}
              </p>
              <div className='flex items-center relative z-[2]'>
                <Button className={classNames('w-[32px] h-[32px] flex items-center justify-center bg-gray-3 rounded-full', bookmarkIds?.indexOf(storyDetail.id) !== -1 && 'bg-active')}
                  onClick={handleSetFavorite}
                >
                  <img src={'/images/heart-none.png'} className='w-[24px]' alt={`Lưu truyện ${storyDetail.title}`} />
                </Button>
                <a className='w-[32px] h-[32px] flex items-center justify-center bg-gray-3 ml-[8px] rounded-full'
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: "Share",
                          text: 'Chia sẻ',
                          url: document.location.href,
                        })
                        .then(() => {
                          console.log('Successfully shared');
                        })
                        .catch(error => {
                          console.error('Something went wrong sharing the blog', error);
                        });
                    }
                  }}>
                  <img src='/images/ic_share.svg' className='w-[24px]' alt='favorite' />
                </a>
              </div>
            </div>
            <div className='flex items-start'>
              <img src={storyDetail.coverImage} alt={`Truyện ${storyDetail.title}`} title={storyDetail.title} className='w-[65px] mr-[12px] rounded-[10px]' />
              <div className='flex-1'>
                <a href={`${storyDetail.slug}`} title={`Truyện ${storyDetail.title}`}>
                  <h1 className='text-[16px] font-bold text-white mb-0'>{storyDetail.title}</h1>
                </a>
                <h2 className='secondary-the-loai text-[14px] font-medium leading-[17px] mt-[4px] mb-0'>
                  {storyDetail?.categories?.slice(0, 3).map((item, i) => (
                    <Link href={`/the-loai/${item.code}`} key={item.code}>
                      <a className='secondary-the-loai text-[14px] font-medium leading-[17px] mt-[4px] mb-0 mr-[6px] underline'>
                        {item.name}{i !== 2 && ','}
                      </a>
                    </Link>
                  ))}
                </h2>
                <div className='mt-[5px]'>
                  {storyDetail?.status === 'ACTIVE' ? 
                  
                    <div>
                      <img src='/images/Done.png' className='fl'/> <p className='st-status'>Hoàn thành</p>
                    </div>
                  :
                    <div>
                      <img src='/images/Loading.png' className='fl'/> <p className='st-status'>Đang cập nhật</p>
                    </div>
                  }
                </div>
                <div className='flex items-center pb-[16px] mt-[10px]'>
                  <div className='flex items-center mr-[32px]'>
                    <div className='w-[32px] h-[32px] rounded-full flex items-center justify-center gray-bg mr-[8px]'>
                      <img src='/images/comments_rating.png' className='w-[24px]' alt={`Lượt thích truyện ${storyDetail?.title}`} />
                    </div>
                    <div>
                      <p className='label-text text-[12px] font-medium leading-[16px] mb-0'>
                        Đánh giá
                      </p>
                      <p className='white-text text-[14px] font-semibold leading-[16px] mb-0 flex items-center'>
                        {formatStringToNumber(storyDetail?.rate)}
                        <img src='/images/star.svg' className='w-[12px] ml-[4px]' alt={`Lượt đánh giá truyện ${storyDetail?.title}`} />
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center'
                    onClick={() => {
                      setShowChapter(true)
                    }}
                  >
                    <div className='w-[32px] h-[32px] rounded-full flex items-center justify-center gray-bg mr-[8px]'>
                      <img src='/images/book-gray.svg' className='w-[24px]' alt={`Danh sách chương truyện ${storyDetail?.title}`} />
                    </div>
                    <div>
                      <p className='label-text text-[12px] font-medium leading-[16px] mb-0'>
                        Chương
                      </p>
                      <p className='white-text text-[14px] font-semibold leading-[16px] mb-0'>
                        {formatStringToNumber(storyDetail?.totalChapter)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {(latestReadingChapter && latestReadingChapter?.chapterSlug) &&
          <div className='box-lastest-reading-chapter'>
            <p>{`Bạn đang đọc tới: ${latestReadingChapter?.chapterTitle}. Bạn muốn đọc tiếp?`}</p>
          </div>
        }
        <div>
          <a className='btnMain btn-doc-ngay mt-[24px]'
            onClick={() => handleReadingNow()}
          >
            {(latestReadingChapter && latestReadingChapter?.chapterSlug) ? 'Đọc tiếp' : 'Đọc từ đầu'}
          </a>
        </div>
        
        <div className='p-[16px] pr-[5px]'>
          <p className='text-[18px] font-bold main-text text-underline'>
            Văn án
          </p>
          <div className='border-b-[1px] border-color pb-[16px]'>
            <div style={{ marginBottom: '10px' }}>
              <ReadMore>
                {storyDetail?.shortDescription}
              </ReadMore>
              {/* Add comment facebook at the end each chapter */}
              {/*<div className="fb-comments" data-href={`https://toidoc.vn/${storyDetail.slug}`} data-width="" data-numposts="10"></div>*/}
            </div>
          </div>

          {storyDetail?.chapters?.length > 0 &&
            <>
              <div className='border-b-[1px] border-color pb-[16px]'>
                <h2 className='text-[18px] font-bold main-text mt-[16px] text-underline'>
                  Chương mới nhất
                </h2>
                {(storyDetail?.chapters?.slice(-5).reverse().map((chapter, indexChapter) => (
                  <div className='grid-item-style text-left' key={indexChapter}>
                    {chapter?.isFree ?
                      <img src='/images/Done.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
                      :
                      <img src='/images/lock.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
                    }
                    <a href={`/${storyDetail?.slug}/${chapter.slug}`} title={`${storyDetail?.title} - ${chapter.title}`} className='text-[16px] newest-chapter-text title-truncate-style'>
                      {chapter?.title}
                    </a>
                  </div>
                )))}
              </div>

              <h2 className='text-[18px] font-bold main-text mt-[16px] text-underline'>
                Danh sách chương
              </h2>
              <PaginatedList items={storyDetail?.chapters}/>
            </>
          }

        </div>
        {showChapter
          && <Chapters setShowChapter={setShowChapter}
            story={storyDetail}
            currentChappter={{}}
          />
        }

        {showModalApp && <ModalComponent
          show={showModalApp}
          handleClose={() => {
            // window.open(`https://shope.ee/50BSb77Zxb`, '_blank', 'Toidoc')
            setShowModalApp(false)
          }}
          isCountDown={false}
          >
            <a onClick={(e) => handleClick(e, 'big-banner')}>
              {/*<img src={popupUrl} className='imgBanner'/>*/}
              <img src='https://media.truyenso1.xyz/ads/update-app.png' className='imgBanner'/>
              
            </a>
          </ModalComponent>}
        
        {showModal && <ModalComponent
          show={showModal}
          handleClose={(e) => handleCloseModal('aff')}
          isCountDown={false}
          countDownTime={5}
        >
          <a onClick={(e) => handleClickShopee()}>
            <img src="https://media.truyenso1.xyz/ads/bxh-ve-vang-20-9.png" className='imgBanner' rel='nofollow'/>
          </a>
        </ModalComponent>}
      </div>
      {/*<MobileShare showBubble={showBubble} setShowBubble={setShowBubble}/>*/}
      {/*<ChatSupportAutoClose/>*/}
    </CommonLayout>
  )
}

export default observer(StorySummary)