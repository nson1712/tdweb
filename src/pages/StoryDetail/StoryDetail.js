import React, { useEffect, useMemo, useState } from 'react'
import Router, { useRouter } from 'next/router'
import * as Api from '../../api/api';
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import { observer } from 'mobx-react'
import StoryStore from '../../stores/StoryStore'
import classNames from 'classnames'
import Chapters from './Chapters'
import MobileShare from '../StorySummary/MobileShare'
import Link from 'next/link'
import LaunchCountdown from "../../components/LaunchCountdown";
import { getMobileOperatingSystem, formatStringToNumber} from "../../utils/utils";
import ModalComponent from '../../components/Modal/Modal'
import ModalWithoutCloseButton from '../../components/Modal/ModalWithoutCloseButton';
import ChatSupportAutoClose from '../../components/Button/ChatSupportAutoClose'
import ShortLogin from '../Login/ShortLogin';
import GlobalStore from '../../stores/GlobalStore'
import Question from './Question';
import OpenInAppInfo from './OpenInAppInfo'
import OpenChapterInfo from './OpenChapterInfo'
import ContentDisplay from './ContentDisplay';

const StoryDetail = ({chapterTitle, storyTitle}) => {
  const [showBubble, setShowBubble] = useState('up');
  const { 
    loadingChapterDetail, 
    getChapterDetail, 
    storyDetail, 
    getStoryDetail, 
    saveLastStory, 
    saveFavoriteCategories, 
    saveViewStory, 
    getStoryPrice,
    checkCustomerClickAff,
    recordClickAff } = StoryStore

  const [showChapter, setShowChapter] = useState(false)

  const route = useRouter()

  const [chapterContents, setChapterContents] = useState([])
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentChapterDetail, setCurrentChapterDetail] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [needOpenChapter, setNeedOpenChapter] = useState(false);
  const [allowOpenWeb, setAllowOpenWeb] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [time, setTime] = useState(180)
  const [fdfssfds, setFdfssfds] = useState('MlsHlea8IaH3qS8MjoXB1kMnlMImwCE7');
  const [jkdjfk, setJkdjfk] = useState('HIwhXNiX7d1z7VxZ');
  const [showModal, setShowModal] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModalApp, setShowModalApp] = useState(false)
  const [isEnoughDiamond, setIsEnoughDiamond] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [availableCash, setAvailableCash] = useState({});
  const [showModalNotEnoughDiamond, setShowModalNotEnoughDiamond] = useState(false);
  const [fullPriceStory, setFullPriceStory] = useState({});
  const [question, setQuestion] = useState({});


  // const checkCustomerClickAffLocal = async() => {
  //   const isClickAff = await checkCustomerClickAff(localStorage.getItem('DEVICE_ID'))
  //   if (!isClickAff) {
  //     setShowModal(true)
  //   }
  // }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])

  // useEffect(() => {
  //   // setShowModal(true)
  //   // checkCustomerClickAffLocal()
  //   console.log('route.query.storySlug: ', route.query.storySlug);
  //   console.log('route.query.chapterSlug: ', route.query.chapterSlug);
  //   if (route.query.storySlug) {
  //     getStoryDetail(route.query.storySlug)
  //   }
  // }, [route.query.storySlug])

  // useEffect(() => {
  //   // Disable right-click (context menu)
  //   const disableContextMenu = (event) => event.preventDefault();
  //   document.addEventListener('contextmenu', disableContextMenu);
  
  //   // Disable copying (Ctrl+C, Cmd+C, etc.)
  //   const disableCopy = (event) => {
  //     event.clipboardData.setData('text/plain', 'Bạn đừng copy dữ liệu của chúng tôi nhé ☹️, tội lắm.');
  //     event.preventDefault();

  //   };
  //   document.addEventListener('copy', disableCopy);
  
  //   // Cleanup on unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', disableContextMenu);
  //     document.removeEventListener('copy', disableCopy);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (storyDetail?.id) {
  //     const selectedCategory = localStorage.getItem('SELECTED_CATEGORIES')

  //     if (!selectedCategory) {
  //       const categories = storyDetail.categories?.map((item) => item.code)
  //       saveFavoriteCategories(categories)
  //       localStorage.setItem('SELECTED_CATEGORIES', categories?.join(','))
  //     }
  //   }

  // }, [storyDetail?.id])

  // useEffect(() => {

    // if (route.query.storySlug && currentSlug) {
    //   saveViewStory(route.query.storySlug)
    // }

  // }, [route.query.chapterSlug, currentSlug])

  const fetchData = async() => {
    try {
      setIsLoading(true);
      setIsMobile(getMobileOperatingSystem());
      const isLoggedIn = await GlobalStore.checkIsLogin();
      const result = await getChapterDetail(route.query.storySlug, route.query.chapterSlug, isLoggedIn)
      // console.log('Chapter detail content: ', result);
      if (route.query.storySlug) {
        await getStoryDetail(route.query.storySlug)
      }
      if (result?.contents.length <= 0) {
        isLoggedIn = await GlobalStore.checkIsLogin();
      }
      let nextChapter = result?.next;
      let prevChapter = result?.previous;
      if (nextChapter) {
        nextChapter = nextChapter.split('_')[1];
      }
      if (prevChapter) {
        prevChapter = prevChapter.split('_')[1];
      }
      setCurrentChapterDetail(result);
      setCurrentChapter({
        ...result,
        next: nextChapter,
        previous: prevChapter
      });
      setLoggedIn(isLoggedIn || result?.free);
      setNeedOpenChapter(!result?.free);

      if (result?.order % 20 === 0 && result?.price > 0 && isLoggedIn && result?.contents?.length > 0) {
        await getQuestion();
        setShowQuestion(true);
      }
  
      if ((result?.contentEnabled && result?.free) || (result?.contentEnabled && !GlobalStore.profile?.subscription)) {
        setAllowOpenWeb(true);
      } else if (!result?.contentEnabled || (result?.contentEnabled && !result?.free && GlobalStore.profile?.subscription)) {
        setAllowOpenWeb(false);
      }
      setChapterContents(result?.contents);
      if (isLoggedIn && result?.free && result?.contentEnabled) {
        saveLastStory(route.query.storySlug, route.query.chapterSlug)
      }
      if (isLoggedIn && !result?.free) {
        await getAvailableCash();
        const priceStory = await getStoryPrice(route.query.storySlug);
        setFullPriceStory(priceStory);
      }
    } catch (e) {

    }
    setIsLoading(false);
  }

  const getAvailableCash = async () => {
    if (!GlobalStore.isLoggedIn) {
      return;
    }
    try {
      const result = await Api.get({
        url: '/customer/customer/availableCash',
        params: {
          intendedUse: storyDetail?.contributorId ? 'UNLOCK_EXCLUSIVE_CHAPTER' : 'UNLOCK_NORMAL_CHAPTER'
        }
      });
      setAvailableCash(result?.data);
      if (currentChapterDetail?.price > result?.data?.balance) {
        setIsEnoughDiamond(false);
      }
    } catch (err) {
      setAvailableCash({balance: 0});
    }
  }

  const getQuestion = async() => {
    if (!GlobalStore.isLoggedIn) {
      return;
    }
    try {
      const result = await Api.get({
        url: '/data/private/data/question'
      });
      setQuestion(result?.data);
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchData();
    
  }, [route.query.chapterSlug, GlobalStore.isLoggedIn]);

  // const [currentChappter, chapterIndex] = useMemo(() => {

  //   let index = 0

  //   const chapter = storyDetail?.chapters?.find((item, i) => {
  //     index = i
  //     return item.slug === currentSlug
  //   })

  //   return [chapter, index]

  // }, [currentSlug, storyDetail])

  // useEffect(() => {
  //   const trackScrolling = () => {
  //     clearTimeout(timeout)
  //     timeout = setTimeout(async () => {
  //       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  //       const body = document.body;
  //       const html = document.documentElement;
  //       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //       const windowBottom = windowHeight + window.pageYOffset;
  //       const isBottom = windowBottom >= docHeight - 1000

  //       if (isBottom && storyDetail.chapters && storyDetail.chapters[chapterIndex + 1] && !loadingChapterDetail) {
  //         if (time <= 0) {
  //           setTime(180)
  //         }
  //         if (orderPopupUrl >= 4) {
  //           setOrderPopupUrl(1)
  //         }
  //         const newUrl = `/${route.query.storySlug}/${storyDetail.chapters[chapterIndex + 1]?.slug}`

  //         window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

  //         const result = await getChapterDetail(route.query.storySlug, storyDetail.chapters[chapterIndex + 1]?.slug)
  //         setChapters(prev => {
  //           if (prev[prev.length - 1]?.id !== storyDetail.chapters[chapterIndex + 1]?.id) {
  //             return [...prev, {
  //               ...storyDetail.chapters[chapterIndex + 1],
  //               chapterDetail: result
  //             }]
  //           }

  //           return prev
            
  //         })
  //         setCurrentChapterDetail(result);
  //         setShowBubble('up');

  //         setCurrentSlug(storyDetail.chapters[chapterIndex + 1].slug)

  //         window.gtag("event", "page_view", {
  //           page_path: location.pathname,
  //         });

  //         // FB.XFBML.parse();

  //         setPopUpUrl(`/images/download-app/popup-${orderPopupUrl}.png`)
  //         setOrderPopupUrl(orderPopupUrl => orderPopupUrl + 1)
  //         // if (time <= 0) {
  //         //   setShowModalApp(true)
  //         // }
  //         // checkCustomerClickAffLocal()
  //       }
  //     }, 100)
  //   }
  //   window.addEventListener('scroll', trackScrolling);

  //   return () => {
  //     window.removeEventListener('scroll', trackScrolling);
  //   }
  // }, [chapterIndex, storyDetail, loadingChapterDetail])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //       setTime(time => time !== 0 ? time - 1 : 0);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // },[]);

  
  // useEffect(() => {
  //   if (chapters?.length > 0 && currentChapterDetail.length > 6) {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   }
   
  // }, [chapters])

  // useEffect(() => {
  //   if (route.query.chapterSlug && route.query.storySlug && currentChappter?.id) {
  //     saveLastStory({
  //       storySlug: route.query.storySlug,
  //       chapterSlug: currentChappter?.slug,
  //       currentChapterOrder: currentChappter.order,
  //       status: chapterIndex === storyDetail?.chapters?.length - 1 ? 'READ_FINISH' : "VIEWING",
  //       chapterDetailId: currentChappter.id
  //     })
  //   }
  // }, [route.query, currentChappter, storyDetail])

  // console.log(currentChappter, currentSlug)

  // function getRandom(min, max) {
  //   const floatRandom = Math.random()
  
  //   const difference = max - min
  
  //   // random between 0 and the difference
  //   const random = Math.round(difference * floatRandom)
  
  //   const randomWithinRange = random + min
  
  //   return randomWithinRange
  // }

  const handleOpenChapter = async() => {
    if (currentChapterDetail?.price > availableCash?.balance) {
      setShowModalNotEnoughDiamond(true);
      return;
    }
    await Api.post({
      url: '/data/private/data/chapter/open',
      data: {
        storySlug: storyDetail.slug,
        numberChapter: 1,
        chapterSlug: route.query.chapterSlug,
        isOpenFull: false
      },
    });

    fetchData();
  }

  const handleSupport = async() => {
    window.open(`https://m.me/185169981351799?text=Mình đang đọc chương ${chapterTitle} bị khoá trên web. Truyện ${storyTitle}. Giờ mình phải làm sao?`, "_blank");
  }

  const handleSupportNotAllow = async() => {
    window.open(`https://m.me/185169981351799?text=Mình đang đọc chương ${chapterTitle} ở trên web mà chương này chỉ được xem trên App. Truyện ${storyTitle}. Giờ mình phải làm sao?`, "_blank");
  }

  const handleShowChapterList = async() => {
    setShowChapter(true);
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
        <div className={`${isMobile && 'hidden'} md:block w-[200px] mt-[27px] mr-[18px]`}>
          <p className='text-[14px] font-bold main-text mb-[16px]'>
            Danh mục
          </p>
          {storyDetail?.chapters?.map((chap, i) => (
            <div className='grid-item-chapter' key={chap?.id}>
              {!chap?.isFree ?
                <img src='/images/lock.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
                :
                <img src='/images/Done.png' style={{'width': '20px', 'float': 'left', 'marginRight': '5px'}}/>
              }
              <a className={classNames('block py-[4px] text-[16px] font-medium secondary-text title-truncate-style', currentChapter?.id === chap?.id && 'primary-text')}
              onClick={() => {
                Router.replace(`/${storyDetail.slug}/${chap.slug}`)
                setShowChapter(false)
              }}
              key={chap.id}
              href={`/${storyDetail.slug}/${chap.slug}`}
              title={`${storyDetail?.title} - ${chap.title}`}
              >
                {i + 1}. {chap.title}
              </a>
            </div>
          ))}
        </div>
        <div className='max-w-[768px] md:bg-white'>
        <div className={`flex items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 bg-story`}>
          <a className='p-[20px]' title={`Truyện ${storyDetail?.title}`}
            onClick={() => {
              Router.back()
            }}
          >
            <img src='/images/arrow-left.svg' className='w-[35px]' alt={`Quay lại truyện ${storyDetail?.title}`}/>
          </a>

          <a href={`/${storyDetail?.slug}`} title={`Truyện ${storyDetail?.title}`}>
            <h1 className='text-[20px] leading-[24px] font-bold main-text mb-0 line-clamp-1'>
              {storyDetail?.title}
            </h1>
          </a>
          <a className='w-[68px] p-[10px] md:hidden ml-[5px]' title={`Trang chủ Toidoc`} href='/'>
            <img src='/images/main-home.png' className='w-[24px]' alt={`Trang chủ Toidoc`}/>
          </a>
          <a className='w-[68px] p-[10px] md:hidden' title={`Bìa truyện ${storyDetail?.title}`} href={`/${storyDetail?.slug}`}>
            <img src='/images/icon-book-open.png' className='w-[24px]' alt={`Danh sách chương truyện ${storyDetail?.title}`}/>
          </a>
          <a className='w-[68px] p-[10px] md:hidden' title={`Danh sách chương truyện ${storyDetail?.title}`}
            onClick={() => {
              handleShowChapterList()
            }}
          >
            <img src='/images/list.png' className='w-[24px]' alt={`Danh sách chương truyện ${storyDetail?.title}`}/>
          </a>
        </div>
        <div className='story-content px-[20px]'>
          <div>
            <a href={`/${currentChapter?.storySlug}/${currentChapter?.chapterSlug}`} title={`${storyDetail?.title} - ${chapterTitle}`}>
              <h2 className='text-[20px] font-bold secondary-text mt-[16px] chapter-title'>{chapterTitle}</h2>
            </a>
      
            <div className='text-[20px] leading-[32px]  breakword'>
              {allowOpenWeb ? 
                <>
                  {GlobalStore.copyData ? 
                    <>
                      <p className='alert-text'>Chúng tôi nghiêm cấm các hành vi sao chép và phát tán dữ liệu từ nền tảng mà chưa được phép.<br/>Hãy tải lại trang để đọc truyện nhé!</p>
                    </>
                    :
                    <>
                      {chapterContents?.map((item, i) => (
                        <div key={`${item.order}-${i}`}>
                          <ContentDisplay item={item} fdsfsjs={fdfssfds} dfjkdsfds={jkdjfk} order={i}/>
                          {i === 6 && <a href='https://m.me/185169981351799?text=Mình quan tâm tới gói Premium. Hỗ trợ mình trên web với'><img src='https://media.truyenso1.xyz/ads/upgrade-premium.png' className='img-ads' alt='Toidoc premium'/></a>}
                        </div>
                      ))}
                    </>
                    }
                  
                  
                  {!loggedIn ?
                    <ShortLogin />
                  : needOpenChapter ?
                    <div>
                      <OpenChapterInfo story={storyDetail} chapter={currentChapter} handleOpenChapter={handleOpenChapter} handleSupport={handleSupport} availableCash={availableCash}/>
                    </div>
                  : <></>
                  }
                </>
              :
                isLoading ? <><p>Đang tải dữ liệu .....</p></>
              : 
                <OpenInAppInfo handleSupport={handleSupportNotAllow} chapterDetail={currentChapterDetail} storyDetail={storyDetail} handleOpenChapter={handleOpenChapter}/>
              }
              

              {currentChapter && 
                <div className='navigation-buttons'>
                  {currentChapter?.previous && <a className='back-button' href={`/${storyDetail?.slug}/${currentChapter?.previous}`}>{'< Chương trước'}</a>}
                  {currentChapter?.next && <a className='next-button' href={`/${storyDetail?.slug}/${currentChapter?.next}`}>{'Chương tiếp >'}</a>}
                </div>
              }
            </div>
          </div>
        </div>
      
        </div>
        { showChapter
          && <Chapters setShowChapter={setShowChapter}
            story={storyDetail}
            currentChapter={currentChapter}
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
        {showModalNotEnoughDiamond && 
          <ModalComponent
            show={showModalNotEnoughDiamond}
            handleClose={(e) => setShowModalNotEnoughDiamond(false)}
            styleBody='background-gradient-gray'>
            <div className='h-[250px]'>
              <p className='mt-[50px] px-[20px]' dangerouslySetInnerHTML={{ __html: `Hiện bạn có tổng <strong><span style='color:rgb(212, 39, 4); font-size: 20px'>${availableCash?.balance}</span></strong> kim cương, không đủ để mở chương này. Bạn hãy nạp thêm nhé` }} />
              <p className='px-[20px]' dangerouslySetInnerHTML={{ __html: `Mở toàn bộ truyện này hết tổng <strong><span style='color:rgb(212, 39, 4); font-size: 20px'>${formatStringToNumber(fullPriceStory?.remained)}</span></strong> kim cương.`}} />
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <a href={`/nap-kim-cuong?ref=${GlobalStore.profile?.referralCode}`} className='button-deposit-diamond'>Nạp kim cương</a>
              </div>
            </div>
          </ModalComponent>
        }
        {showQuestion &&
          <ModalWithoutCloseButton
            show={showQuestion}
            handleClose={(e) => setShowQuestion(false)}
            styleBody='background-gradient-gray'>
            <Question question={question} closeModal = {() => setShowQuestion(false)} />
          </ModalWithoutCloseButton>
        }
      </div>
    {/*<MobileShare showBubble={showBubble} setShowBubble={setShowBubble}/>*/}
    {/*<ChatSupportAutoClose/>*/}
    </CommonLayout>
  )
}

export default observer(StoryDetail)
