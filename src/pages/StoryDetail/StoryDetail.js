import React, { useEffect, useMemo, useState } from 'react'
import Router, { useRouter } from 'next/router'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import classNames from 'classnames'
import Chapters from './Chapters'
import MobileShare from '../StorySummary/MobileShare'
import Link from 'next/link'
import LaunchCountdown from "../../components/LaunchCountdown";
import { getMobileOperatingSystem } from "../../utils/utils";
import ModalComponent from '../../components/Modal/Modal'
import ChatSupportAutoClose from '../../components/Button/ChatSupportAutoClose'

let timeout;
let isMobile = true;

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

const StoryDetail = () => {
  const scrollDirection = useScrollDirection();
  const [showBubble, setShowBubble] = useState('up');
  const { 
    loadingChapterDetail, 
    getChapterDetail, 
    storyDetail, 
    getStoryDetail, 
    saveLastStory, 
    saveFavoriteCategories, 
    saveViewStory, 
    saveCustomerClickBanner,
    checkCustomerClickAff,
    recordClickAff } = StoryStore

  const [showChapter, setShowChapter] = useState(false)

  const route = useRouter()

  const [chapters, setChapters] = useState([])
  const [currentSlug, setCurrentSlug] = useState(route.query.chapterSlug)
  const [currentChapterDetail, setCurrentChapterDetail] = useState([])
  const [time, setTime] = useState(180)
  const [showModal, setShowModal] = useState(false)
  const [showModalApp, setShowModalApp] = useState(false)
  const [popupUrl, setPopUpUrl] = useState('/images/download-app/popup-1.png')
  const [orderPopupUrl, setOrderPopupUrl] = useState(1)


  // const checkCustomerClickAffLocal = async() => {
  //   const isClickAff = await checkCustomerClickAff(localStorage.getItem('DEVICE_ID'))
  //   if (!isClickAff) {
  //     setShowModal(true)
  //   }
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    // setShowModal(true)
    // checkCustomerClickAffLocal()
    if (route.query.storySlug) {
      getStoryDetail(route.query.storySlug)
    }
  }, [route.query.storySlug])

  useEffect(() => {
    if (storyDetail?.id) {
      const selectedCategory = localStorage.getItem('SELECTED_CATEGORIES')

      if (!selectedCategory) {
        const categories = storyDetail.categories?.map((item) => item.code)
        saveFavoriteCategories(categories)
        localStorage.setItem('SELECTED_CATEGORIES', categories?.join(','))
      }
    }

  }, [storyDetail?.id])

  // useEffect(() => {

    // if (route.query.storySlug && currentSlug) {
    //   saveViewStory(route.query.storySlug)
    // }

  // }, [route.query.chapterSlug, currentSlug])

  useEffect(() => {

    const getFirstChapter = async () => {
      let currentIndex = 0
      const currentChappter = storyDetail.chapters.find((item, i) => {
        currentIndex = i
        return item.slug === route.query.chapterSlug
      })
      setCurrentSlug(currentChappter.slug)
      const result = await getChapterDetail(route.query.storySlug, currentChappter.slug)
      setChapters([{
        ...currentChappter,
        currentIndex,
        chapterDetail: result
      }])
      setCurrentChapterDetail(result)
    }

    if (storyDetail?.id) {
      getFirstChapter()
    }

  }, [storyDetail, route.query.chapterSlug])

  const [currentChappter, chapterIndex] = useMemo(() => {

    let index = 0

    const chapter = storyDetail?.chapters?.find((item, i) => {
      index = i
      return item.slug === currentSlug
    })

    return [chapter, index]

  }, [currentSlug, storyDetail])

  useEffect(() => {
    const trackScrolling = () => {
      clearTimeout(timeout)
      timeout = setTimeout(async () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        const isBottom = windowBottom >= docHeight - 1000

        if (isBottom && storyDetail.chapters && storyDetail.chapters[chapterIndex + 1] && !loadingChapterDetail) {
          if (time <= 0) {
            setTime(180)
          }
          if (orderPopupUrl >= 4) {
            setOrderPopupUrl(1)
          }
          const newUrl = `/${route.query.storySlug}/${storyDetail.chapters[chapterIndex + 1]?.slug}`

          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

          const result = await getChapterDetail(route.query.storySlug, storyDetail.chapters[chapterIndex + 1]?.slug)
          setChapters(prev => {
            if (prev[prev.length - 1]?.id !== storyDetail.chapters[chapterIndex + 1]?.id) {
              return [...prev, {
                ...storyDetail.chapters[chapterIndex + 1],
                chapterDetail: result
              }]
            }

            return prev
            
          })
          setCurrentChapterDetail(result);
          setShowBubble('up');

          setCurrentSlug(storyDetail.chapters[chapterIndex + 1].slug)

          window.gtag("event", "page_view", {
            page_path: location.pathname,
          });

          // FB.XFBML.parse();

          setPopUpUrl(`/images/download-app/popup-${orderPopupUrl}.png`)
          setOrderPopupUrl(orderPopupUrl => orderPopupUrl + 1)
          // if (time <= 0) {
          //   setShowModalApp(true)
          // }
          // checkCustomerClickAffLocal()
        }
      }, 100)
    }
    window.addEventListener('scroll', trackScrolling);

    return () => {
      window.removeEventListener('scroll', trackScrolling);
    }
  }, [chapterIndex, storyDetail, loadingChapterDetail])

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(time => time !== 0 ? time - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  
  // useEffect(() => {
  //   if (chapters?.length > 0 && currentChapterDetail.length > 6) {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   }
   
  // }, [chapters])

  useEffect(() => {
    if (route.query.chapterSlug && route.query.storySlug && currentChappter?.id) {
      saveLastStory({
        storySlug: route.query.storySlug,
        chapterSlug: currentChappter?.slug,
        currentChapterOrder: currentChappter.order,
        status: chapterIndex === storyDetail?.chapters?.length - 1 ? 'READ_FINISH' : "VIEWING",
        chapterDetailId: currentChappter.id
      })
    }
  }, [route.query, currentChappter, storyDetail])

  console.log(currentChappter, currentSlug)

  function getRandom(min, max) {
    const floatRandom = Math.random()
  
    const difference = max - min
  
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)
  
    const randomWithinRange = random + min
  
    return randomWithinRange
  }

  const handleClick = (e, code) => {
    setShowModalApp(false)
    // saveCustomerClickBanner(code)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, '_blank', 'Toidoc')
  };

  const handleCloseModal = async(code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL_CLOSE')
    setShowModal(false)
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL_CLOSE')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  }

  const handleClickShopee = async() => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL')
    setShowModal(false)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, '_blank', 'Toidoc')
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  }
  return (
    <CommonLayout>
    <div className='bg-story flex items-start justify-center'>
      <div className='hidden md:block w-[200px] mt-[90px] mr-[18px]'>
        <p className='text-[14px] font-bold main-text mb-[16px]'>
          Danh mục
        </p>
        {storyDetail?.chapters?.map((chap) => (
          <a key={chap?.id} className={classNames('block text-[14px] leading-[20px] font-medium label-text mb-[8px]', chap.id === currentChappter?.id && 'main-text')}
            onClick={() => {
              Router.replace(`/${storyDetail.slug}/${chap?.slug}`)
            }}
            href={`/${storyDetail.slug}/${chap?.slug}`}
            title={`${storyDetail?.title} - ${chap?.title}`}
          >
            {chap?.title}
          </a>
        ))}
      </div>
      <div className='max-w-[768px] md:bg-white'>
      <div className={`flex items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 bg-story ${scrollDirection === 'down' ? 'hide' : 'show-header'}`}>
        <a className='p-[20px]' title={`Truyện ${storyDetail?.title}`}
          onClick={() => {
            Router.back()
          }}
        >
          <img src='/images/arrow-left.svg' className='w-[24px]' alt={`Quay lại truyện ${storyDetail?.title}`}/>
        </a>

        <a href={`/${storyDetail?.slug}`} title={`Truyện ${storyDetail?.title}`}>
          <h1 className='text-[20px] leading-[20px] font-bold main-text mb-0 line-clamp-1'>
            {storyDetail?.title}
          </h1>
        </a>

        <div className='hidden md:block w-[68px]' />

        <a className='w-[68px] p-[20px] md:hidden' title={`Danh sách chương truyện ${storyDetail?.title}`}
          onClick={() => {
            setShowChapter(true)
          }}
        >
          <img src='/images/checkmark.svg' className='w-[24px]' alt={`Danh sách chương truyện ${storyDetail?.title}`}/>
        </a>
      </div>
      <div className='story-content px-[20px]'>
        {(chapters.map((chapter, indexChapter) => (
          <div key={chapter.id}>
            {indexChapter === 0 && <p className='text-[20px] font-bold label-text mt-[16px] chapter-title'>
            Mở đầu
            </p>}
      
            <a href={`/${storyDetail?.slug}/${chapter.slug}`} title={`${storyDetail?.title} - ${chapter.title}`}>
              <h2 className='text-[20px] font-bold secondary-text mt-[16px] chapter-title'>{chapter.title}</h2>
            </a>
      
            <div className='text-[20px] leading-[32px]  breakword'>
              {chapter?.chapterDetail?.map((item, i) => (
                <div key={`${item.order}-${i}`}>
                  {/* <p  className='font-content' dangerouslySetInnerHTML={{__html: item.content}} /> */}
            
                  <p  className='font-content' dangerouslySetInnerHTML={{__html: item.content}} />
                  {/* {i === 6 && <p dangerouslySetInnerHTML={{__html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3889009823396535" crossorigin="anonymous"></script><ins class="adsbygoogle banner-adsense-content-click" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-3889009823396535" data-ad-slot="5416873782"></ins>`}}/>} */}
                  {/* {i === 16 && <p dangerouslySetInnerHTML={{__html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3889009823396535" crossorigin="anonymous"></script><ins class="adsbygoogle banner-adsense-content-click" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-3889009823396535" data-ad-slot="5416873782"></ins>`}}/>} */}
                  {i === 6 && <a href='https://zalo.me/0941642183'><img src='https://media.truyenso1.xyz/ads/chat-gpt-min.png' className='img-ads' alt='Bán tài khoản ChatGPT'/></a>}

                  {/* {i === 14 && 
                    <div style={{'z-index': '1', 'height': '812px', 'margin': '0px auto', 'position': 'relative', 'overflow': 'initial'}}>
                      <div style={{'position': 'absolute', 'width': '100%', 'height': '812px', 'clip': 'rect(-46px, 576px, 812px, -15px)'}}>
                        <a onClick={(e) => handleClick(e, 'big-banner-content')}>
                          {isMobile ? 
                            <img style={{'display': 'inline-block', 'position': 'fixed', 'top': '115px', 'left' : '0'}} 
                              src={`/images/${`${indexChapter}`.slice(-1)}.jpg`} />
                            : 
                            <img style={{'display': 'inline-block', 'position': 'fixed', 'top': '115px'}} 
                            src={`https://media.truyenso1.xyz/ads/${`${indexChapter}`.slice(-1)}.jpg`} />
                          }
                        </a>
                      </div>
                    </div>
                  } */}
                </div>
              ))}
            </div>
            {chapter?.nextChapter === '' && <div style={{'float':'left'}}>Mời bạn cùng <b>toidoc.vn</b> theo dõi các truyện khác cùng thể loại: &nbsp; 
              {storyDetail?.categories?.slice(0, 3).map((item, i) => (
                <span>
                  <Link href={`/the-loai/${item.code}`} key={item.code}>
                    <a className='underline'>
                      {item.name}
                    </a>
                  </Link>
                  {i !== 2 && ', '}
                </span>
                ))}
              </div>
            }

            {/* {chapter?.chapterDetail?.length <= 3 && <LaunchCountdown days={8} hours={23} minutes={30} seconds={41}/> } */}
      
            {chapter?.chapterDetail?.length > 3 &&
              <>
                {`${indexChapter}`.slice(-1) === '0' && chapter.nextChapterStr !== ''
                ? 
                <a onClick={(e) => handleClick(e, 'banner-doc-nhanh-hon')}>
                  <img src={"/images/download-app/Banner-7-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '1' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-bao-ve-mat')}>
                  <img src={"/images/download-app/Banner-3-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '2' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-khoi-mat-dau')}>
                  <img src={"/images/download-app/Banner-4-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '3' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-truyen-yeu-thich')}>
                  <img src={"/images/download-app/Banner-5-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '4' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-khong-quang-cao')}>
                  <img src={"/images/download-app/Banner-6-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a> 
                :
                `${indexChapter}`.slice(-1) === '5' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-doc-nhanh-hon')}>
                  <img src={"/images/download-app/Banner-7-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a> 
                :
                `${indexChapter}`.slice(-1) === '6' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-bao-ve-mat')}>
                  <img src={"/images/download-app/Banner-3-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '7' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-truyen-yeu-thich')}>
                  <img src={"/images/download-app/Banner-5-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '8' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-khong-quang-cao')}>
                  <img src={"/images/download-app/Banner-6-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                :
                `${indexChapter}`.slice(-1) === '9' && chapter.nextChapter !== ''
                ?
                <a onClick={(e) => handleClick(e, 'banner-doc-nhanh-hon')}>
                  <img src={"/images/download-app/Banner-7-min.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                </a>
                : chapter.nextChapter !== '' &&
                // <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <a onClick={(e) => handleClick(e, 'banner-50k')}>
                  <img src={"/images/banner-50k1.png"} className='mb-[4px] mt-[20px] img-banner' alt='banner'/>
                </a>
              }
              </>
            }

            {/* Add comment facebook at the end each chapter */}
            {/*<div class="fb-comments" data-href={`https://toidoc.vn/${storyDetail.slug}`} data-width="" data-numposts="10"></div>*/}
          </div>
        )))}
      {/* {(storyDetail.slug === 'keo-chu-nho-ty-phu-lac-xuong-pham-tran-1' || 
        storyDetail.slug === 'thay-chi-lay-chong' || 
        storyDetail.slug === 'thu-buong-binh-da-nghi-thong-suot' ||
        storyDetail.slug === 'cuu-roi-anh-chua-lanh-em' ||
        storyDetail.slug === 'thap-nien-70-me-dep-xem-mat-toi-huong-phuc' ||
        storyDetail.slug === 'dao-mo-toc-truong-nha-ta-la-tieu-ca' ||
        storyDetail.slug === 'toi-cong-luoc-nam-chinh-that-bai-roi' ||
        storyDetail.slug === 'khong-lam-the-than' ||
        storyDetail.slug === 'mat-mu' ||
        storyDetail.slug === 'trao-anh-anh-duong-am-ap' ||
        storyDetail.slug === 'tien-ve-phia-nhau' ||
        storyDetail.slug === 'nam-chinh-nu-phu-ta-khong-can-cac-nguoi' ||
        storyDetail.slug === 'vo-boss-la-cong-chua' ||
        storyDetail.slug === 'anh-sang-tu-cuu-roi' ||
        storyDetail.slug === 'co-gai-nam-do-da-chet-roi') ?
            chapters.slice(0, 11).map((chapter, i) => (
              chapter.order > 10 ?
                <div style = {{'background': 'radial-gradient(75.59% 87.72% at 40% 36.01%, #A5B6BF 0%, #819CA8 24.48%, #5E8192 55.21%, #284754 97.92%)', 'width': '100%', 'padding': '20px'}}>
                  <div style={{'max-width': '343px', 'margin': 'auto', 'display': 'block'}}>
                    <div className='content-download-app-detail'>
                      <div style={{'margin': '15px', 'width': '100%'}}>
                        <img src='/images/toidoc-logo.png' style = {{'float':'left', 'margin-left': '10px'}}/>
                        <p style={{'color': '#909090', 'line-height': '16px', 'font-size': '14px', 'width': '55%', 'float': 'right', 'margin-top': '10px'}}>Nền tảng cộng đồng đọc truyện online</p>
                      </div>
                      <hr style={{'border-top': '1px dashed rgb(116 110 110)', 'margin-left': '24px', 'margin-right' : '24px', 'width': '266px'}}/>
                      <img src='/images/finance-img.png' style={{'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'width': '40%'}}/>
                      <p style={{'color': '#303030', 'text-align': 'center', 'font-size': '17px', 'font-weight': '700', 'line-height': '26px', 'margin-right': '30px', 'marginTop': '20px'}}>Tải App TOIDOC ngay <br/>để đọc Full truyện !</p>
                      <div style={{'height': '48px', 'border-radius': '8px', 'background': '#FFF9E5', 'border': '1px dashed #FFE999', 'marginLeft': '20px', 'marginRight': '20px', 'paddingTop': '8px', 'paddingRight': '5px'}}>
                        <div style={{'width': '32px', 'float': 'left', 'marginRight': '16px', 'marginLeft': '5px', 'marginTop': '5px'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 32 20" fill="none">
                            <path d="M0 1.66667C0 0.746192 0.716344 0 1.6 0H30.4C31.2837 0 32 0.746192 32 1.66667V7.52954C31.8694 7.51007 31.7358 7.5 31.6 7.5C30.0536 7.5 28.8 8.80584 28.8 10.4167C28.8 12.0275 30.0536 13.3333 31.6 13.3333C31.7358 13.3333 31.8694 13.3233 32 13.3038V18.3333C32 19.2538 31.2837 20 30.4 20H1.6C0.716345 20 0 19.2538 0 18.3333V13.3038C1.35692 13.1016 2.4 11.886 2.4 10.4167C2.4 8.9473 1.35692 7.73172 0 7.52954V1.66667Z" fill="#FFE381"/>
                            <path d="M15.1033 3.81698C15.4701 3.07374 16.5299 3.07374 16.8967 3.81699L18.1185 6.29249C18.2641 6.58763 18.5457 6.7922 18.8714 6.83953L21.6033 7.2365C22.4235 7.35568 22.751 8.36365 22.1575 8.94219L20.1807 10.8691C19.945 11.0988 19.8375 11.4298 19.8931 11.7542L20.3598 14.4751C20.4999 15.292 19.6424 15.9149 18.9088 15.5293L16.4653 14.2446C16.174 14.0915 15.826 14.0915 15.5347 14.2446L13.0912 15.5293C12.3576 15.9149 11.5001 15.292 11.6402 14.4751L12.1069 11.7542C12.1625 11.4298 12.055 11.0988 11.8193 10.8691L9.8425 8.94219C9.24898 8.36365 9.57649 7.35568 10.3967 7.2365L13.1286 6.83953C13.4543 6.7922 13.7359 6.58763 13.8815 6.29249L15.1033 3.81698Z" fill="#E8B80E"/>
                          </svg>
                        </div>
                        <p style={{'color': '#909090', 'font-size': '14px', 'font-weight': '400', 'line-height': '16px', 'textAlign': 'center'}}>Cộng thêm 01 vé vàng khi tài khoản mở thành công</p>
                      </div>
                      <div style={{'marginLeft' : '16px', 'marginTop': '15px', 'marginBottom': '24px'}}>
                        <a href='https://toidoc.onelink.me/59bO/d42503wz' target='_blank' rel="nofollow">
                          <img src='/images/android-icon-min.png' style={{'width': '120px', 'float': 'left', 'marginRight': '24px'}}/>
                          <img src='/images/apple-icon-min.png' style={{'width': '120px'}}/>
                        </a>
                      </div>
                    </div>
                    <div style={{'maxWidth': '343px'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 343 460" fill="none">
                        <mask id="path-1-inside-1_4585_22194" fill="white">
                        <path fillRule="evenodd" clip-rule="evenodd" d="M0 8.00001C0 3.58173 3.58172 0 8 0H335C339.418 0 343 3.58172 343 8V72C336.373 72 331 77.3726 331 84C331 90.6274 336.373 96 343 96V452C343 456.418 339.418 460 335 460H7.99999C3.58172 460 0 456.418 0 452V96C6.62742 96 12 90.6274 12 84C12 77.3726 6.62742 72 0 72V8.00001Z"/>
                        </mask>
                        <path fillRule="evenodd" clip-rule="evenodd" d="M0 8.00001C0 3.58173 3.58172 0 8 0H335C339.418 0 343 3.58172 343 8V72C336.373 72 331 77.3726 331 84C331 90.6274 336.373 96 343 96V452C343 456.418 339.418 460 335 460H7.99999C3.58172 460 0 456.418 0 452V96C6.62742 96 12 90.6274 12 84C12 77.3726 6.62742 72 0 72V8.00001Z" fill="white"/>
                        <path d="M343 72V73H344V72H343ZM343 96H344V95H343V96ZM0 96V95H-1V96H0ZM0 72H-1V73H0V72ZM8 -1C3.02944 -1 -1 3.02945 -1 8.00001H1C1 4.13401 4.13401 1 8 1V-1ZM335 -1H8V1H335V-1ZM344 8C344 3.02944 339.971 -1 335 -1V1C338.866 1 342 4.13401 342 8H344ZM344 72V8H342V72H344ZM332 84C332 77.9249 336.925 73 343 73V71C335.82 71 330 76.8203 330 84H332ZM343 95C336.925 95 332 90.0751 332 84H330C330 91.1797 335.82 97 343 97V95ZM344 452V96H342V452H344ZM335 461C339.971 461 344 456.971 344 452H342C342 455.866 338.866 459 335 459V461ZM7.99999 461H335V459H7.99999V461ZM-1 452C-1 456.971 3.02943 461 7.99999 461V459C4.134 459 1 455.866 1 452H-1ZM-1 96V452H1V96H-1ZM11 84C11 90.0751 6.07513 95 0 95V97C7.1797 97 13 91.1797 13 84H11ZM0 73C6.07513 73 11 77.9249 11 84H13C13 76.8203 7.1797 71 0 71V73ZM-1 8.00001V72H1V8.00001H-1Z" fill="#F0F0F0" mask="url(#path-1-inside-1_4585_22194)"/>
                      </svg>
                    </div>
                  </div>
                </div>
                :
                
              ))

          :
            chapters.map((chapter, i) => (
              <div key={chapter.id}>
                {i === 0 && <p className='text-[20px] font-bold label-text mt-[16px] chapter-title'>
                Mở đầu
                </p>}
          
                <a href={`/${storyDetail?.slug}/${chapter.slug}`} title={`${storyDetail?.title} - ${chapter.title}`}>
                  <h2 className='text-[20px] font-bold secondary-text mt-[16px] chapter-title'>{chapter.title}</h2>
                </a>
          
                <div className='text-[20px] leading-[32px]  breakword'>
                  {chapter?.chapterDetail?.map((item, i) => (
                    <div key={`${item.order}-${i}`}>
                      {/* <p  className='font-content' dangerouslySetInnerHTML={{__html: item.content}} />
                      {i === 6 && <p dangerouslySetInnerHTML={{__html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3889009823396535" crossorigin="anonymous"></script><ins class="adsbygoogle banner-adsense-content-click" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-3889009823396535" data-ad-slot="5416873782"></ins>`}}/>} /}
                      <p  className='font-content' dangerouslySetInnerHTML={{__html: item.content}} />
                      {/* {i === 6 && <a href='https://shope.ee/6KZMIryNUw'><img src='/images/kem-chong-nang.jpg' className='img-ads' alt='Kem Chống Nắng MartiDerm'/></a>} /}
                    </div>
                  ))}
                </div>
                {chapter?.nextChapter === '' && <div style={{'float':'left'}}>Mời bạn cùng <b>toidoc.vn</b> theo dõi các truyện khác cùng thể loại: &nbsp; 
                  {storyDetail?.categories?.slice(0, 3).map((item, i) => (
                    <span>
                      <Link href={`/the-loai/${item.code}`} key={item.code}>
                        <a className='underline'>
                          {item.name}
                        </a>
                      </Link>
                      {i !== 2 && ', '}
                    </span>
                    ))}
                  </div>
                }
          
                {chapter?.chapterDetail?.length > 3 &&
                  <>
                    {`${i}`.slice(-1) === '0' && chapter.nextChapterStr !== ''
                    ? 
                      <a onClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/download-app/banner-50k1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '1' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-author')}>
                        <img src={"/images/download-app/banner-author1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '2' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/download-app/banner-50k1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '3' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-author')}>
                        <img src={"/images/download-app/banner-author1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '4' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/download-app/banner-50k1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a> 
                      :
                      `${i}`.slice(-1) === '5' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-huyen')}>
                        <img src={"/images/download-app/banner-author1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a> 
                      :
                      `${i}`.slice(-1) === '6' && chapter.nextChapter !== ''
                      ?
                      <a onClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/download-app/banner-50k1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '7' && chapter.nextChapter !== ''
                      ?
                      <a honClick={(e) => handleClick(e, 'banner-author')}>
                        <img src={"/images/download-app/banner-author1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '8' && chapter.nextChapter !== ''
                      ?
                      <a honClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/download-app/banner-50k1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      :
                      `${i}`.slice(-1) === '9' && chapter.nextChapter !== ''
                      ?
                      <a honClick={(e) => handleClick(e, 'banner-author')}>
                        <img src={"/images/download-app/banner-author1.png"} className='mb-[4px] mt-[20px] w=full rounded-[10px] img-banner' alt='banner'/>
                      </a>
                      : chapter.nextChapter !== '' &&
                      // <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                      <a onClick={(e) => handleClick(e, 'banner-50k')}>
                        <img src={"/images/banner-50k1.png"} className='mb-[4px] mt-[20px] img-banner' alt='banner'/>
                      </a>
                    }
                  </>
                }
              </div>
            ))
          } */}
      </div>
      

      {/* { currentChappter?.id
        && <div className='p-[20px] flex items-center border-t-[1px] border-color fixed md:static left-0 right-0 bottom-0 bg-story'>
          <a className=''
            onClick={() => {
              if (chapterIndex > 0) {
                Router.replace(`/${storyDetail.slug}/${storyDetail.chapters[chapterIndex - 1]?.slug}`)
              }
            }}
          >
            <img src={chapterIndex === 0 ? '/images/arrow-inactive.png' : '/images/arrow-active.png'} className={classNames('w-[24px]', chapterIndex !== 0 && 'rotate-180')}/>
          </a>
          <a className='mx-[16px]'
            onClick={() => {
              if (chapterIndex < storyDetail?.chapters?.length - 1) {
                Router.replace(`/${storyDetail.slug}/${storyDetail.chapters[chapterIndex + 1]?.slug}`)
              }
            }}
          >
            <img src={chapterIndex === storyDetail?.chapters?.length - 1 ? '/images/arrow-inactive.png' : '/images/arrow-active.png'} className='w-[24px]'/>
          </a>
          <p className='text-[16px] font-bold main-text mb-0 flex-1 line-clamp-2'>
            {currentChappter?.title}
          </p>
        </div>
        } */}
      
      </div>
      { showChapter
        && <Chapters setShowChapter={setShowChapter}
          story={storyDetail}
          currentChappter={currentChappter}
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

export default observer(StoryDetail)
