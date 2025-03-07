import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import * as Api from "../../api/api";
import Button from "../../components/Button/Button";
import { formatStringToNumber } from "../../utils/utils";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import classNames from "classnames";
import Link from "next/link";
import MobileHeader from "../../components/Header/MobileHeader";
import Header from "../../components/Header/Header";
import Chapters from "../StoryDetail/Chapters";
import MobileShare from "./MobileShare";
import LaunchCountdown from "../../components/LaunchCountdown";
import { getMobileOperatingSystem } from "../../utils/utils";
import ModalComponent from "../../components/Modal/Modal";
import { toast } from "react-toastify";
import PaginatedList from "./PaginatedList";
import GlobalStore from "../../stores/GlobalStore";
import PriceInfo from "./PriceInfo";
import ShortLogin from "../Login/ShortLogin";
import { Alert, Spin } from "antd";
import Image from "next/image";
import imageLoader from "../../loader/imageLoader";
import BlogStore from "../../stores/BlogStore";
import withIconTitle from "../../components/CustomIconTitle";
import TrendingIcon from "../../../public/icons/TrendingIcon";
import NewIcon from "../../../public/icons/NewIcon";
import HotStories from "../../components/HotStories";
import ButtonViewAll from "../../components/ButtonViewAll";

const TABS = [
  {
    label: "Nội dung",
    value: "CONTENT",
  },
  {
    label: "Mục lục",
    value: "CHAPTERS",
  },
];

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
      {isReadMore ? (
        <span
          dangerouslySetInnerHTML={{
            __html: (text ? text.slice(0, 370) : "") + "...",
          }}
        />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      )}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <span
            className="detail-story-short-description-xem-them-click"
            dangerouslySetInnerHTML={{
              __html: "<br/><span className='btn-view-more'>Xem thêm</span>",
            }}
          />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: "<br/>Thu gọn" }} />
        )}
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
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    isMobile = getMobileOperatingSystem();
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

const StorySummary = ({storyDetail, articleDetail}) => {
  const scrollDirection = useScrollDirection();
  const [showBubble, setShowBubble] = useState("up");
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showChapter, setShowChapter] = useState(false);
  const [time, setTime] = useState(180);
  const [showModal, setShowModal] = useState(false);
  const [showModalApp, setShowModalApp] = useState(false);
  const [popupUrl, setPopUpUrl] = useState("/images/download-app/popup-1.png");
  const [availableCash, setAvailableCash] = useState({});
  const [discountValue, setDiscountValue] = useState(0);
  const [finalChargeDiamond, setFinalChargeDiamond] = useState(0);
  const [showModalNotEnoughDiamond, setShowModalNotEnoughDiamond] =
    useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    // storyDetail,
    // getStoryDetail,
    saveBookMark,
    bookmarkIds,
    unBookMark,
    getChapterDetail,
    loadingChapterDetail,
    getStoryPrice,
    getReadingLatestChapter,
    latestReadingChapter,
    saveViewStory,
    saveCustomerClickBanner,
    checkCustomerClickAff,
    recordClickAff,
    isOpenFull,
    setIsOpenFull,
    topTrending,
    getTopTrending,
    topNew,
    getTopNew
  } = StoryStore;
  // const { storyDetailArticle, getBlogStoryDetail } = BlogStore;
  const [currentChapterDetail, setCurrentChapterDetail] = useState([]);

  const [currentTab, setCurrentTab] = useState("CONTENT");
  const [chapters, setChapters] = useState([]);

  const route = useRouter();


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
    const fetchData = async () => {
      if (route.query.storySlug) {
        // await getStoryDetail(route.query.storySlug);
        const isLoggedIn = await GlobalStore.checkIsLogin();
        if (isLoggedIn) {
          await getReadingLatestChapter(route.query.storySlug);
          await getAvailableCash();
          const storyPrice = await getStoryPrice(route.query.storySlug);
          setDiscountValue(storyPrice?.discounted);
          setFinalChargeDiamond(storyPrice?.remained);
        } else if (storyDetail) {
          setDiscountValue(storyDetail?.discountDiamond);
          if (storyDetail?.comboDiamond > 0) {
            setFinalChargeDiamond(storyDetail?.comboDiamond);
          } else {
            setFinalChargeDiamond(storyDetail?.totalDiamond);
          }
        }
      }
    };
    fetchData();
  }, [route.query.storySlug]);

  useEffect(() => {
    getPriceInfo();
  }, [storyDetail?.id, isOpenFull]);

  useEffect(() => {
    // getBlogStoryDetail(route.query.storySlug);
    getTopTrending(0, 16);
    getTopNew(0, 16);
  }, [route.query.storySlug]);


  const getPriceInfo = async () => {
    if (GlobalStore.isLoggedIn) {
      const storyPrice = await getStoryPrice(route.query.storySlug);
      setDiscountValue(storyPrice?.net);
      setFinalChargeDiamond(storyPrice?.remained);
    } else {
      setDiscountValue(storyDetail?.discountDiamond);
      if (storyDetail?.comboDiamond > 0) {
        setFinalChargeDiamond(storyDetail?.comboDiamond);
      } else {
        setFinalChargeDiamond(storyDetail?.totalDiamond);
      }
    }
  };
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime((time) => (time !== 0 ? time - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const getAvailableCash = async () => {
    try {
      const result = await Api.get({
        url: "/customer/customer/availableCash",
        params: {
          intendedUse: storyDetail?.contributorId
            ? "UNLOCK_EXCLUSIVE_CHAPTER"
            : "UNLOCK_NORMAL_CHAPTER",
        },
        hideError: true
      });
      setAvailableCash(result?.data);
    } catch (err) {
      setAvailableCash({ balance: 0 });
    }
  };
  const handleSetFavorite = async () => {
    if (route.query.storySlug) {
      if (bookmarkIds.indexOf(storyDetail?.id) === -1) {
        await saveBookMark(route.query.storySlug, storyDetail?.id);
      } else {
        await unBookMark(route.query.storySlug, storyDetail?.id);
      }
    }
  };

  const handleOpenFullChapter = async () => {
    setLoading(true);
    try {
      console.log("GlobalStore.isLoggedIn: ", GlobalStore.isLoggedIn);
      if (!GlobalStore.isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      if (finalChargeDiamond > availableCash?.balance) {
        setShowModalNotEnoughDiamond(true);
        return;
      }
      await Api.post({
        url: "/data/private/data/chapter/open",
        data: {
          storySlug: storyDetail.slug,
          isOpenFull: true,
        },
      });
      setIsOpenFull(true);
      await getPriceInfo();
      await getAvailableCash();
      setLoading(false);
      toast(
        "Bạn đã mở khoá chương thành công.\nVui lòng bấm lựa chọn chương để đọc!",
        {
          type: "success",
          theme: "colored",
        }
      );
    } catch (e) {
      setIsOpenFull(false);
      setLoading(false);
      console.log(e);
    }
  };

  const handleClick = (e, code) => {
    setShowModalApp(false);
    // saveCustomerClickBanner(code)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, "_blank", "Toidoc");
  };

  const handleClickShortDescription = (e, code) => {
    // saveCustomerClickBanner(code)
    window.open(
      `https://shopee.vn/m/sale-cuoi-thang-don-luong-ve`,
      "_blank",
      "Toidoc"
    );
  };

  const handleCloseModal = async (code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY_CLOSE')
    setShowModal(false);
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY_CLOSE')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  };

  const handleClickShopee = async () => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY')
    setShowModal(false);
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, "_blank", "Toidoc");
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_SUMMARY')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  };

  // useEffect(() => {
  //   console.log('currentChapterDetail.length: ' + currentChapterDetail.length)
  //   if (chapters?.length > 0 && currentChapterDetail.length > 6) {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   }

  // }, [chapters])

  const modifiedContent = articleDetail ? articleDetail?.content
    ?.replace(/<(h[1-6])([^>]*)>/g, '<$1$2 class="text-lg">')
    .replace(
      /<figure([^>]*)>(.*?)<\/figure>/g,
      '<div class="flex justify-center"><figure$1>$2</figure></div>'
    ) : '';

  const TopTrendingTitle = withIconTitle(TrendingIcon, "Truyện Hot 🔥")
  const TopNewTitle = withIconTitle(NewIcon, "Truyện Mới 💥")

  return (
    <CommonLayout>
      {/* <div className='hidden md:block'> */}
      <Header />
      {/* </div> */}
      <div className="max-w-[620px] mx-[auto] pt-10 md:pt-20 bg-story">
        {/*<div className={classNames('flex items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 top-0 z-[99] bg-white mobile-header', scrollOffset > 100 && 'mobile-header-show', `${scrollDirection === 'down' ? 'hide' : 'show-header'}`)}>
          <a className='p-[10px]' title={`Truyện ${storyDetail?.title}`}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            <img src="/images/arrow-left.svg" className="w-6" />
          </a>

          <Link href={`/${storyDetail?.slug}`} passHref>
            <a title={`Truyện ${storyDetail?.title}`}>
              <h1 className="text-lg leading-[20px] font-bold main-text mb-0 line-clamp-1">
                {storyDetail?.title}
              </h1>
            </a>
          </Link>

          <div className="hidden md:block w-[68px]" />

          <a
            className="w-[68px] p-[10px] md:hidden"
            title={`Danh sách chương - ${storyDetail?.title}`}
            onClick={() => {
              setShowChapter(true);
            }}
          >
            <img src="/images/checkmark.svg" className="w-6" />
          </a>
        </div>*/}

        <MobileHeader show={scrollOffset <= 100} />
        {/*<div
          className="mt-[14px]"
          dangerouslySetInnerHTML={{
            __html: `<a id='link-video-header' href='https://toidoc.onelink.me/59bO/d42503wz'> <video autoplay loop muted playsinline><source src='https://media.truyenso1.xyz/ads/top-banner.mp4' type='video/mp4' rel='nofollow'/></video> </a>`,
          }}
        />*/}
        <div className="h-fit relative mb-4 pb-7 pt-4">
          <div className="bg-story-summary" />
          <img
            src={storyDetail?.thumbnail || storyDetail?.coverImage}
            alt={`Truyện ${storyDetail?.title}`}
            title={storyDetail?.title}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute left-0 right-0 bottom-0 top-0 summary-banner z-[2] flex flex-col justify-between px-5 pt-6 pb-9">
            <div className="relative flex items-center justify-between">
              <a
                className="relative z-[2]"
                title={`Nền tảng cộng đồng đọc truyện toidoc.vn`}
                onClick={() => {
                  Router.back();
                }}
              >
                <img
                  src="/images/arrow-white.svg"
                  className="w-6"
                  alt="black"
                />
              </a>
              <p className="absolute top-0 right-0 left-0 bottom-0 text-base font-bold text-white text-center mb-0 leading-[32px] px-20">
                {/* Chi tiết */}
              </p>
              <div className="flex items-center relative z-[2]">
                <Button
                  className={classNames(
                    "w-[32px] h-[32px] flex items-center justify-center bg-gray-3 rounded-full",
                    bookmarkIds?.indexOf(storyDetail?.id) !== -1 && "bg-active"
                  )}
                  onClick={handleSetFavorite}
                >
                  <img
                    src={"/images/heart-none.png"}
                    className="w-6"
                    alt={`Lưu truyện ${storyDetail?.title}`}
                  />
                </Button>
                <a
                  className="w-8 h-8 flex items-center justify-center bg-gray-3 ml-2 rounded-full"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: "Share",
                          text: "Chia sẻ",
                          url: document.location.href,
                        })
                        .then(() => {
                          console.log("Successfully shared");
                        })
                        .catch((error) => {
                          console.error(
                            "Something went wrong sharing the blog",
                            error
                          );
                        });
                    }
                  }}
                >
                  <img
                    src="/images/ic_share.svg"
                    className="w-6"
                    alt="favorite"
                  />
                </a>
              </div>
            </div>
            <div className="flex gap-x-4 items-start">
              <div className="max-w-24 mt-2">
                <img
                  src={storyDetail?.thumbnail || storyDetail?.coverImage}
                  alt={`Truyện ${storyDetail?.title}`}
                  title={storyDetail?.title}
                  className="w-28 h-30 rounded-[10px]"
                />
              </div>

              <div className="flex flex-col justify-center self-center w-full space-y-1.5">
                <Link href={`${storyDetail?.slug}`} passHref>
                  <a title={`Truyện ${storyDetail?.title}`}>
                    <h1 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                      {storyDetail?.title}
                    </h1>
                  </a>
                </Link>
                <h2 className="secondary-the-loai text-xs sm:text-sm font-medium">
                  {storyDetail?.categories?.slice(0, 3).map((item, i) => (
                    <Link
                      href={`/the-loai/${item.code}`}
                      key={item.code}
                      passHref
                    >
                      <a className="secondary-the-loai text-xs sm:text-sm font-medium mr-1.5 underline">
                        {item.name}
                        {i !== 2 && ","}
                      </a>
                    </Link>
                  ))}
                </h2>
                <div className="flex rounded-xl bg-black/30 w-fit px-2.5 py-1 gap-x-1.5">
                  <div className="self-center">
                    <img
                      src={
                        storyDetail?.status === "ACTIVE"
                          ? "/images/Done.png"
                          : "/images/Loading.png"
                      }
                    />
                  </div>
                  <div
                    className={`${
                      storyDetail?.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-[#5c95c6]"
                    } text-xs sm:text-sm self-center font-semibold`}
                  >
                    {storyDetail?.status === "ACTIVE"
                      ? "Hoàn thành"
                      : "Đang ra tiếp"}
                  </div>
                </div>
                <div className="flex gap-x-4 items-center">
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center gray-bg mr-2">
                      <img
                        src="/images/comments_rating.png"
                        className="w-4 sm:w-6"
                        alt={`Lượt thích truyện ${storyDetail?.title}`}
                      />
                    </div>
                    <div>
                      <div className="label-text text-xs font-medium leading-4 mb-0">
                        Đánh giá
                      </div>
                      <div className="white-text text-sm font-semibold leading-4 mb-0 flex items-center">
                        {formatStringToNumber(storyDetail?.rate)}
                        <img
                          src="/images/star.svg"
                          className="w-3 ml-1"
                          alt={`Lượt đánh giá truyện ${storyDetail?.title}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center"
                    onClick={() => {
                      setShowChapter(true);
                    }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center gray-bg mr-2">
                      <img
                        src="/images/book-gray.svg"
                        className="w-4 sm:w-6"
                        alt={`Danh sách chương truyện ${storyDetail?.title}`}
                      />
                    </div>
                    <div>
                      <p className="label-text text-xs font-medium leading-4 mb-0">
                        Chương
                      </p>
                      <p className="white-text text-sm font-semibold leading-4 mb-0">
                        {formatStringToNumber(storyDetail?.totalChapter)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {latestReadingChapter && latestReadingChapter?.chapterSlug && (
          <Alert
            message={`Bạn đang đọc tới: ${latestReadingChapter?.chapterTitle}. Bạn muốn đọc tiếp?`}
            type="warning"
            className="mb-4 text-base"
          />
        )}
        <div>
          <Link
            href={
              latestReadingChapter?.storySlug
                ? `/${latestReadingChapter.storySlug}/${latestReadingChapter.chapterSlug}`
                : storyDetail?.chapters?.length > 0
                ? `/${storyDetail.slug}/${storyDetail?.chapters[0].slug}`
                : "/"
            }
            passHref
          >
            <a className="btnMain btn-doc-ngay mt-6">
              {latestReadingChapter?.chapterSlug ? "Đọc tiếp" : "Đọc từ đầu"}
            </a>
          </Link>
        </div>
        {finalChargeDiamond > 0 && (
          <PriceInfo
            discountValue={discountValue}
            finalChargeValue={finalChargeDiamond}
            storyDetail={storyDetail}
            handleOpenFullChapter={handleOpenFullChapter}
          />
        )}

        <div className="py-4">
          <p className="text-lg font-bold main-text text-underline px-2">Giới thiệu truyện</p>
          <div className="border-b-[1px] border-color pb-4 px-2">
            <div style={{ marginBottom: "10px" }}>
              <ReadMore>{storyDetail?.shortDescription}</ReadMore>
              {/* Add comment facebook at the end each chapter */}
              {/*<div className="fb-comments" data-href={`https://toidoc.vn/${storyDetail.slug}`} data-width="" data-numposts="10"></div>*/}
            </div>
          </div>

          {storyDetail?.chapters?.length > 0 && (
            <>
              <div className="border-b-[1px] border-color pb-4 px-2">
                <h2 className="text-lg font-bold main-text mt-4 text-underline mb-4">
                  Chương ra mới nhất
                </h2>
                {storyDetail?.chapters
                  ?.slice(-5)
                  .reverse()
                  .map((chapter, indexChapter) => (
                    <div
                      className="grid-item-style text-left"
                      key={indexChapter}
                    >
                      {chapter?.isFree ? (
                        <img
                          src="/images/Done.png"
                          className="w-5 float-left mr-[5px]"
                          width="20" height="20"
                          alt="Chương mở Free"
                        />
                      ) : (
                        <img
                          src="/images/lock.png"
                          className="w-5 float-left mr-[5px]"
                          width="20" height="20"
                          alt="Chương bị khoá"
                        />
                      )}
                      <Link
                        href={`/${storyDetail?.slug}/${chapter.slug}`}
                        passHref
                      >
                        <a
                          title={`${storyDetail?.title} - ${chapter.title}`}
                          className="text-base newest-chapter-text title-truncate-style"
                        >
                          {chapter?.title}
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>

              <h2 className="text-lg font-bold main-text mt-4 text-underline px-2">
                Danh sách chương
              </h2>
              <PaginatedList items={storyDetail?.chapters} />
            </>
          )}
        </div>

        <div className="border-1 p-3 rounded-2xl space-y-4 mx-2 mt-4">
            <TopTrendingTitle />
            <HotStories className="grid grid-cols-4 justify-center gap-x-3 gap-y-5" data={topTrending?.data}/>
            <div className="flex">
              <ButtonViewAll
                className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
                url="/danh-sach-truyen/trending"
                title="Xem thêm danh sách truyện HOT"
              />
            </div>
          </div>

          <div className="border-1 p-3 rounded-2xl space-y-4 mx-2 my-4">
            <TopNewTitle />
            <HotStories className="grid grid-cols-4 justify-center gap-x-2 gap-y-5" data={topNew?.data}/>
            <div className="flex">
              <ButtonViewAll
                className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
                url="/danh-sach-truyen/moi-nhat"
                title="Xem thêm danh sách truyện mới ra"
              />
            </div>
          </div>

        {modifiedContent && (
          <div className="mt-[20px]">
            <h2 className="text-lg font-bold main-text text-underline">
              [REVIEW Truyện] {storyDetail?.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
          </div>
        )}

        {showChapter && (
          <Chapters
            setShowChapter={setShowChapter}
            story={storyDetail}
            currentChappter={{}}
          />
        )}

        {showModalApp && (
          <ModalComponent
            show={showModalApp}
            handleClose={() => {
              // window.open(`https://shope.ee/50BSb77Zxb`, '_blank', 'Toidoc')
              setShowModalApp(false);
            }}
            isCountDown={false}
          >
            <a onClick={(e) => handleClick(e, "big-banner")}>
              {/*<img src={popupUrl} className='imgBanner'/>*/}
              <img
                src="https://media.truyenso1.xyz/ads/update-app.png"
                className="imgBanner"
              />
            </a>
          </ModalComponent>
        )}

        {showModal && (
          <ModalComponent
            show={showModal}
            handleClose={(e) => handleCloseModal("aff")}
            isCountDown={false}
            countDownTime={5}
          >
            <a onClick={(e) => handleClickShopee()}>
              <img
                src="https://media.truyenso1.xyz/ads/bxh-ve-vang-20-9.png"
                className="imgBanner"
                rel="nofollow"
              />
            </a>
          </ModalComponent>
        )}
        {showModalNotEnoughDiamond && (
          <ModalComponent
            show={showModalNotEnoughDiamond}
            handleClose={(e) => {
              setShowModalNotEnoughDiamond(false);
              setLoading(false);
            }}
            styleBody="background-gradient-gray"
          >
            <div className="h-[250px]">
              <p
                className="mt-[50px] p-[20px]"
                dangerouslySetInnerHTML={{
                  __html: `Hiện bạn có tổng <strong><span style='color:rgb(212, 39, 4); font-size: 20px'>${formatStringToNumber(
                    availableCash?.balance
                  )}</span></strong> kim cương, không đủ để mở chương này. Bạn hãy nạp thêm nhé`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  href={`/nap-kim-cuong?ref=${GlobalStore.profile?.referralCode}&story=${storyDetail?.slug}&chapter=`}
                  passHref
                >
                  <a
                    id="nap-kim-cuong"
                    class="relative border-0 bg-transparent p-0 mt-4 cursor-pointer outline-none focus:outline-none select-none touch-manipulation transition-filter duration-250 group"
                  >
                    <span class="absolute top-0 left-0 w-full h-full rounded-xl bg-black/25 will-change-transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]"></span>
                    <span class="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(340deg_100%_16%)] via-[hsl(340deg_100%_32%)] to-[hsl(340deg_100%_16%)]"></span>
                    <span class="block relative px-[27px] py-[12px] rounded-xl text-white bg-[hsl(345deg_100%_47%)] will-change-transform translate-y-[-4px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[-6px] group-active:translate-y-[-2px] text-[1.1rem]">
                      Nạp kim cương
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </ModalComponent>
        )}
        {showLoginModal && (
          <ModalComponent
            show={showLoginModal}
            handleClose={(e) => {
              setShowLoginModal(false);
              setLoading(false);
            }}
          >
            <ShortLogin
              description="Đăng nhập 1 chạm để mở khoá tất cả các chương đang có của truyện này."
              closeModal={() => {
                setShowLoginModal(false);
                setLoading(false);
              }}
            />
          </ModalComponent>
        )}
      </div>
      {/*<MobileShare showBubble={showBubble} setShowBubble={setShowBubble}/>*/}
      {/*<ChatSupportAutoClose/>*/}
      <Spin spinning={loadingChapterDetail || loading} fullscreen={true} />
    </CommonLayout>
  );
};

export default observer(StorySummary);
