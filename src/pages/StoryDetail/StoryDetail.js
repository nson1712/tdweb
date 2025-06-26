import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import * as Api from "../../api/api";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import { toast } from "react-toastify";
import Chapters from "./Chapters";
// import MobileShare from "../StorySummary/MobileShare";
// import LaunchCountdown from "../../components/LaunchCountdown";
import { formatStringToNumber } from "../../utils/utils";
import ModalComponent from "../../components/Modal/Modal";
import ModalWithoutCloseButton from "../../components/Modal/ModalWithoutCloseButton";
// import ChatSupportAutoClose from "../../components/Button/ChatSupportAutoClose";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ShortLogin from "../Login/ShortLogin";
import GlobalStore from "../../stores/GlobalStore";
import Question from "./Question";
import OpenInAppInfo from "./OpenInAppInfo";
import OpenChapterInfo from "./OpenChapterInfo";
import ContentDisplay from "./ContentDisplay";
import Link from "next/link";
import { Modal, Spin, Table, Watermark } from "antd";
import { LeftOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import { useStoryChapterTableOptions } from "../../hook/useTableOption";
import HotStories from "../../components/HotStories";
import ButtonViewAll from "../../components/ButtonViewAll";
import withIconTitle from "../../components/CustomIconTitle";
import TrendingIcon from "../../../public/icons/TrendingIcon";
import NewIcon from "../../../public/icons/NewIcon";
import Image from "next/image";
import imageLoader from "../../loader/imageLoader";

const StoryDetail = ({ chapterTitle, storyTitle }) => {
  // const [showBubble, setShowBubble] = useState("up");
  const {
    loadingChapterDetail,
    getChapterDetail,
    storyDetail,
    getStoryDetail,
    saveLastStory,
    // saveFavoriteCategories,
    // saveViewStory,
    getStoryPrice,
    // checkCustomerClickAff,
    // recordClickAff,
    topNew,
    getTopNew,
    topTrending,
    getTopTrending,
  } = StoryStore;

  const [showChapter, setShowChapter] = useState(false);

  const route = useRouter();

  const [chapterContents, setChapterContents] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({});
  const [currentChapterDetail, setCurrentChapterDetail] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [needOpenChapter, setNeedOpenChapter] = useState(false);
  const [allowOpenWeb, setAllowOpenWeb] = useState(false);
  // const [time, setTime] = useState(180);
  const [fdfssfds, setFdfssfds] = useState("MlsHlea8IaH3qS8MjoXB1kMnlMImwCE7");
  const [jkdjfk, setJkdjfk] = useState("HIwhXNiX7d1z7VxZ");
  const [showModal, setShowModal] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModalApp, setShowModalApp] = useState(false);
  const [affType, setAffType] = useState("");
  const [affObj, setAffObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [availableCash, setAvailableCash] = useState({});
  const [showModalNotEnoughDiamond, setShowModalNotEnoughDiamond] =
    useState(false);
  const [fullPriceStory, setFullPriceStory] = useState({});
  const [question, setQuestion] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("oldest");
  const [showDepositSuccessWarning, setShowDepositSuccessWarning] =
    useState(false);

  const { storyChapterColumns } = useStoryChapterTableOptions();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const isLoggedIn = await GlobalStore.checkIsLogin();
      const result = await getChapterDetail(
        route.query.storySlug,
        route.query.chapterSlug,
        isLoggedIn
      );

      if (route.query.storySlug) {
        const detailStory = await getStoryDetail(route.query.storySlug);
        if (isLoggedIn && !result?.free) {
          await getAvailableCash(detailStory);
          const priceStory = await getStoryPrice(route.query.storySlug);
          setFullPriceStory(priceStory);
        }
      }
      // if (result?.contents.length <= 0) {
      //   isLoggedIn = await GlobalStore.checkIsLogin();
      // }

      let nextChapter = result?.next;
      let prevChapter = result?.previous;
      if (nextChapter) {
        nextChapter = nextChapter.split("_")[1];
      }
      if (prevChapter) {
        prevChapter = prevChapter.split("_")[1];
      }
      setCurrentChapterDetail(result);
      setCurrentChapter({
        ...result,
        next: nextChapter,
        previous: prevChapter,
        slug: route.query.chapterSlug,
      });

      //setLoggedIn(isLoggedIn || ((result?.order < 5 || (result?.totalChapter > 20 && result?.order < 10) || (result?.totalChapter > 50 && result?.order < 26)) && result?.free));
      setLoggedIn(isLoggedIn || result?.free);
      setNeedOpenChapter(!result?.free);

      if (
        result?.order % 5 === 0 &&
        result?.price > 0 &&
        isLoggedIn &&
        result?.contents?.length > 0
      ) {
        await getQuestion();
      }

      if (
        (result?.contentEnabled && result?.free) ||
        (result?.contentEnabled && !GlobalStore.profile?.subscription)
      ) {
        setAllowOpenWeb(true);
      } else if (
        !result?.contentEnabled ||
        (result?.contentEnabled &&
          !result?.free &&
          GlobalStore.profile?.subscription)
      ) {
        setAllowOpenWeb(false);
      }
      setChapterContents(result?.contents);
      if (isLoggedIn && result?.free && result?.contentEnabled) {
        saveLastStory(route.query.storySlug, route.query.chapterSlug);
      }
      // await getAds();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const getAvailableCash = async (detailStory) => {
    //  console.log('Start get available cash');
    if (!GlobalStore.isLoggedIn) {
      return;
    }
    try {
      // console.log('storyDetail: ', detailStory);
      const result = await Api.get({
        url: "/customer/customer/availableCash",
        params: {
          intendedUse: detailStory?.contributorId
            ? "UNLOCK_EXCLUSIVE_CHAPTER"
            : "UNLOCK_NORMAL_CHAPTER",
        },
        hideError: true,
      });
      setAvailableCash(result?.data);
    } catch (err) {
      setAvailableCash({ balance: 0 });
    }
  };

  // const getAds = async () => {
  //   try {
  //     const result = await Api.get({
  //       url: "/data/shopee/aff/detail",
  //       params: {
  //         type: "ALL",
  //       },
  //       hideError: true,
  //     });
  //     if (result?.data && result?.data?.linkAff) {
  //       setAffType(result?.data?.type);
  //       setAffObj(result?.data);
  //     }
  //   } catch (err) {}
  // };

  const getQuestion = async () => {
    if (!GlobalStore.isLoggedIn) {
      return;
    }
    try {
      const result = await Api.get({
        url: "/data/private/data/question",
        hideError: true,
      });
      setQuestion(result?.data);
      if (result?.data && result?.data?.id !== null) {
        setShowQuestion(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (!isLoading) {
      fetchData();
    }
  }, [route.query.storySlug, route.query.chapterSlug, GlobalStore.isLoggedIn]);

  useEffect(() => {
    getTopNew(0, 16);
    getTopTrending(0, 16);
  }, []);

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

  const handleOpenChapter = async () => {
    try {
      if (currentChapterDetail?.price > availableCash?.balance) {
        setShowModalNotEnoughDiamond(true);
        return;
      }
      await Api.post({
        url: "/data/private/data/chapter/open",
        data: {
          storySlug: storyDetail.slug,
          numberChapter: 1,
          chapterSlug: route.query.chapterSlug,
          isOpenFull: false,
        },
      });
      toast("Bạn đã mở chương thành công!", {
        type: "success",
        theme: "colored",
      });
      fetchData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {}
  };

  const handlePaymentDepositAuto = async (isOpenFull, isShowAlertSuccess) => {
    try {
      // console.log('isOpenFull 2: ', isOpenFull);
      if (isOpenFull) {
        // console.log('isOpenFull 3: ', isOpenFull);
        await Api.post({
          url: "/data/private/data/chapter/open",
          data: {
            storySlug: storyDetail.slug,
            isOpenFull: true,
          },
        });
        if (isShowAlertSuccess) {
          toast("Bạn đã mở chương thành công!", {
            type: "success",
            theme: "colored",
          });
        }
      }
      await fetchData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {}
  };

  const handleSupport = async () => {
    window.open(
      `https://m.me/185169981351799?text=${
        GlobalStore.profile?.referralCode
          ? "Mã KH của mình là: " + GlobalStore.profile?.referralCode + ". "
          : ""
      }Mình đang đọc chương ${chapterTitle} bị khoá trên web. Truyện ${storyTitle}. Giờ mình phải làm sao?`,
      "_blank"
    );
  };

  const handleSupportNotAllow = async () => {
    window.open(
      `https://m.me/185169981351799?text=${
        GlobalStore.profile?.referralCode
          ? "Mã KH của mình là: " + GlobalStore.profile?.referralCode + ". "
          : ""
      }Mình đang đọc chương ${chapterTitle} ở trên web mà chương này chỉ được xem trên App. Truyện ${storyTitle}. Giờ mình phải làm sao?`,
      "_blank"
    );
  };

  const handleOKWarningDepositSuccess = async () => {
    setShowDepositSuccessWarning(false);
    window.open(
      `https://m.me/185169981351799?text=${
        GlobalStore.profile?.referralCode
          ? "Mã KH của mình là: " + GlobalStore.profile?.referralCode + ". "
          : ""
      }Mình vừa chuyển khoản thành công qua web, nạp kim cương giúp mình với.`,
      "_blank"
    );
  };

  const handleShowChapterList = async () => {
    setShowChapter(true);
  };

  const handleClick = (e, code) => {
    setShowModalApp(false);
    // saveCustomerClickBanner(code)
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, "_blank", "Toidoc");
  };

  const handleCloseModal = async (code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL_CLOSE')
    setShowModal(false);
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL_CLOSE')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  };

  const handleClickShopee = async () => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL')
    setShowModal(false);
    window.open(`https://toidoc.onelink.me/59bO/d42503wz`, "_blank", "Toidoc");
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'STORY_DETAIL')
    // window.open(`https://s.shopee.vn/6KjCdy3HYx`, '_blank', 'Toidoc')
  };

  const handleSupportOpenChapter = () => {
    window.open(
      `https://m.me/185169981351799?text=Mình bị khoá chương ở: ${chapterTitle} -- Truyện: ${storyTitle}. Hỗ trợ mình nạp kim cương. Mã KH: ${GlobalStore.profile?.referralCode}`,
      "_blank",
      "Toidoc"
    );
  };

  const handlePremiumBannerClick = () => {
    window.open(
      `https://m.me/185169981351799?text=Mình muốn đký gói Premium trên Web, Toidoc hỗ trợ mình nhé! %0A Mã khách hàng: ${GlobalStore.profile?.referralCode}`
    );
  };

  const showchapterModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const TopTrendingTitle = withIconTitle(TrendingIcon, "Truyện Hot 🔥");
  const TopNewTitle = withIconTitle(NewIcon, "Truyện Mới 💥");

  const handleErrorNotification = () => {
    window.open(
      `https://m.me/185169981351799?text=Mình đang đọc ${chapterTitle} %0A Truyện: ${storyTitle} %0A Nhưng bị thiếu nội dung, Toidoc hỗ trợ mình với!`
    );
  };

  return (
    <>
      <div className="bg-story flex items-start justify-center sm:mt-[100px]">
        {/* <div
          className={`${
            isMobile && "hidden"
          } md:block w-[200px] mt-[27px] mr-[18px]`}
        >
          <p className="text-[14px] font-bold main-text mb-[16px]">Danh mục</p>
          {storyDetail?.chapters?.map((chap, i) => (
            <div className="grid-item-chapter" key={chap?.id}>
              {!chap?.isFree ? (
                <img
                  src="/images/lock.png"
                  style={{ width: "20px", float: "left", marginRight: "5px" }}
                />
              ) : (
                <img
                  src="/images/Done.png"
                  style={{ width: "20px", float: "left", marginRight: "5px" }}
                />
              )}
              <a
                className={classNames(
                  "block py-[4px] text-[16px] font-medium secondary-text title-truncate-style",
                  currentChapter?.id === chap?.id && "primary-text"
                )}
                onClick={() => {
                  Router.replace(`/${storyDetail.slug}/${chap.slug}`);
                  setShowChapter(false);
                }}
                key={chap.id}
                href={`/${storyDetail.slug}/${chap.slug}`}
                title={`${storyDetail?.title} - ${chap.title}`}
              >
                {i + 1}. {chap.title}
              </a>
            </div>
          ))}
        </div> */}

        <div className="max-w-[768px] md:bg-white pb-10">
          <div className="hidden md:flex border-b-[1px] border-color px-[5px] py-[10px] bg-[#f0f0f0] text-black font-semibold font-sans">
            <Link href="/tim-kiem" passHref>
              <a className="text-blue-500 max-w-[30%]">Trang khám phá</a>
            </Link>
            <img className="h-[20px] mx-[10px]" src="/images/arrowright.png" />
            <Link href={`/${storyDetail?.slug}`} passHref>
              <a
                className="text-blue-500 max-w-[40%] line-clamp-1 text-ellipsis"
                title={storyDetail?.title}
              >
                {storyDetail?.title}
              </a>
            </Link>
            <img className="h-[20px] mx-[10px]" src="/images/arrowright.png" />
            <Link
              href={`/${storyDetail?.slug}/${route.query.chapterSlug}`}
              passHref
            >
              <a
                className="text-blue-500 max-w-[30%] line-clamp-1 text-ellipsis"
                title={chapterTitle}
              >
                {chapterTitle}
              </a>
            </Link>
          </div>

          <div className="flex sm:hidden items-center justify-between border-b-[1px] border-color fixed md:static top-0 left-0 right-0 bg-story z-50">
            <a
              className="p-[20px]"
              title={`Truyện ${storyDetail?.title}`}
              onClick={() => {
                Router.back();
              }}
            >
              <img
                src="/images/arrow-left.svg"
                className="w-[35px]"
                alt={`Quay lại truyện ${storyDetail?.title}`}
              />
            </a>

            <Link href={`/${storyDetail?.slug}`} passHref>
              <a title={`Truyện ${storyDetail?.title} ${chapterTitle}`}>
                <h1 className="text-[20px] leading-[24px] font-bold main-text mb-0 line-clamp-1">
                  {storyDetail?.title} {chapterTitle}
                </h1>
              </a>
            </Link>
            <Link href="/tim-kiem" passHref>
              <a
                className="w-[68px] p-[10px] md:hidden ml-[5px]"
                title={`Trang chủ Toidoc`}
              >
                <img
                  src="/images/main-home.png"
                  className="w-[24px]"
                  alt={`Trang chủ Toidoc`}
                />
              </a>
            </Link>
            <Link href={`/${storyDetail?.slug}`} passHref>
              <a
                className="w-[68px] p-[10px] md:hidden"
                title={`Bìa truyện ${storyDetail?.title}`}
              >
                <img
                  src="/images/icon-book-open.png"
                  className="w-[24px]"
                  alt={`Danh sách chương truyện ${storyDetail?.title}`}
                />
              </a>
            </Link>
            <a
              className="w-[68px] p-[10px] md:hidden"
              title={`Danh sách chương truyện ${storyDetail?.title}`}
              onClick={() => {
                handleShowChapterList();
              }}
            >
              <img
                src="/images/list.png"
                className="w-[24px]"
                alt={`Danh sách chương truyện ${storyDetail?.title}`}
              />
            </a>
          </div>

          <div className="flex justify-between pt-20 sm:pt-6 px-2">
            <Link
              href={`/${storyDetail?.slug}/${currentChapter?.previous}`}
              passHref
            >
              <a
                className={`${
                  currentChapter?.previous ? "block" : "invisible"
                } h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-sm text-center shadow-md hover:!text-black cursor-pointer`}
              >
                <LeftOutlined /> Chương trước
              </a>
            </Link>

            <div
              className="flex border border-slate-300 h-fit py-2 px-2.5 bg-slate-100 rounded-md shadow-md cursor-pointer"
              onClick={showchapterModal}
            >
              <MenuOutlined />
            </div>

            <Link
              href={`/${storyDetail?.slug}/${currentChapter?.next}`}
              passHref
            >
              <a
                className={`${
                  currentChapter?.next ? "block" : "invisible"
                } h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-sm text-center shadow-md hover:!text-black cursor-pointer`}
              >
                Chương Tiếp <RightOutlined />
              </a>
            </Link>
          </div>

          <div className="px-3 py-4">
            <div>
              <Link
                href={`/${storyDetail?.slug}/${route.query.chapterSlug}`}
                passHref
              >
                <a title={`${storyDetail?.title} - ${chapterTitle}`}>
                  <h2 className="text-[20px] font-bold secondary-text mt-[16px] chapter-title">
                    {chapterTitle}
                  </h2>
                </a>
              </Link>

              <div className="text-[20px] leading-[32px] breakword">
                {allowOpenWeb ? (
                  <>
                    {GlobalStore.copyData ? (
                      <>
                        <p className="alert-text">
                          Chúng tôi nghiêm cấm các hành vi sao chép và phát tán
                          dữ liệu từ nền tảng mà chưa được phép.
                          <br />
                          Hãy tải lại trang để đọc truyện nhé!
                        </p>
                      </>
                    ) : !loggedIn ? (
                      <ShortLogin />
                    ) : needOpenChapter ? (
                      <div>
                        <GoogleReCaptchaProvider reCaptchaKey="6LemlQIqAAAAAN3GiXSgwfSljLMiGgRAINr1ALev">
                          <OpenChapterInfo
                            story={storyDetail}
                            chapter={currentChapter}
                            handleOpenChapter={handleOpenChapter}
                            handleSupport={handleSupport}
                            availableCash={availableCash}
                            fullPriceStory={fullPriceStory}
                            setShowWarningDepositSuccess={() =>
                              setShowDepositSuccessWarning(true)
                            }
                            handlePaymentDepositAuto={handlePaymentDepositAuto}
                            handleSupportOpenChapter={handleSupportOpenChapter}
                          />
                        </GoogleReCaptchaProvider>
                      </div>
                    ) : currentChapterDetail.price &&
                      currentChapterDetail.order > 50 &&
                      currentChapterDetail.order % 10 <= 5 ? (
                      <>
                        <Watermark
                          gap={[30, 0]}
                          height={160}
                          width={160}
                          image="../images/td-logo.png"
                          className="overflow-visible"
                        >
                          <div className="max-h-full overflow-auto">
                            {chapterContents.map((item, i) => (
                              <>
                                <ContentDisplay
                                  key={i}
                                  item={item}
                                  fdsfsjs={fdfssfds}
                                  dfjkdsfds={jkdjfk}
                                  order={i}
                                />
                                {/*affType !== '' && affType === 'LIVESTREAM' && i === (chapterContents.length - 6) ?
                              <div className='mt-[40px] mb-[20px]'>
                                <p dangerouslySetInnerHTML={{__html: `${affObj?.productName}`}}/>
                                <p className='text-[#ff0600]'><strong>🎁 ƯU ĐÃI ĐỘC QUYỀN từ TOIDOC 🎁</strong></p>
                                <p>👉 Giảm ngay 10% khi gửi mã TOIDOC</p>
                                <p>👉 FREE SHIP Toàn Quốc</p>
                                <div
                                  className="flex items-center justify-center"
                                  dangerouslySetInnerHTML={{
                                    __html: `${affObj?.linkAff}`,
                                  }}
                                />
                                <div className="flex items-center justify-center">
                                  <Link
                                    href={`https://www.facebook.com/guchicofficial`}
                                    passHref
                                  >
                                    <a
                                      id="live-story-detail"
                                      className="w-[300px] h-[50px] btnLiveStream px-[4px] py-[8px]"
                                      target="_blank"
                                    >
                                      Vào Facebook Xem Live
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              affType !== "" &&
                              i === chapterContents.length - 6 && (
                                <div className="mt-[40px] mb-[20px]">
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: `${affObj?.productName}`,
                                    }}
                                  />
                                  <p className="text-[#ff0600]">
                                    <strong>
                                      🎁 ƯU ĐÃI ĐỘC QUYỀN từ TOIDOC 🎁
                                    </strong>
                                  </p>
                                  <p>👉 Giảm ngay 10% khi gửi mã TOIDOC</p>
                                  <p>👉 FREE SHIP Toàn Quốc</p>
                                  <div className="flex items-center justify-center">
                                    <Link href={`${affObj.linkAff}`} passHref>
                                      <a
                                        id="live-chapter-content-image"
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        <img
                                          src={`${affObj?.image}`}
                                          className="w-[200px]"
                                        ></img>
                                      </a>
                                    </Link>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <Link href={`${affObj.linkAff}`} passHref>
                                      <a
                                        id="live-chapter-content"
                                        className="w-[200px] btnLiveStream px-[4px] py-[2px] text-[12px]"
                                        target="_blank"
                                        rel="nofollow"
                                      >
                                        Xem Sản Phẩm
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              )
                            )}
                            )*/}
                              </>
                            ))}
                          </div>
                        </Watermark>
                      </>
                    ) : (
                      <>
                        <div className="max-h-full overflow-auto">
                          {chapterContents.map((item, i) => (
                            <ContentDisplay
                              key={i}
                              item={item}
                              fdsfsjs={fdfssfds}
                              dfjkdsfds={jkdjfk}
                              order={i}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : isLoading ? (
                  <>
                    <p>Đang tải dữ liệu .....</p>
                  </>
                ) : (
                  <OpenInAppInfo
                    handleSupport={handleSupportNotAllow}
                    chapterDetail={currentChapterDetail}
                    storyDetail={storyDetail}
                    handleOpenChapter={handleOpenChapter}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2 px-2">
            <Link
              href={`/${storyDetail?.slug}/${currentChapter?.previous}`}
              passHref
            >
              <a
                className={`${
                  currentChapter?.previous ? "block" : "invisible"
                } h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-sm text-center shadow-md hover:!text-black cursor-pointer`}
              >
                <LeftOutlined /> Chương trước
              </a>
            </Link>

            <div
              className="flex border border-slate-300 h-fit py-2 px-2.5 bg-slate-100 rounded-md shadow-md cursor-pointer"
              onClick={showchapterModal}
            >
              <MenuOutlined />
            </div>

            <Link
              href={`/${storyDetail?.slug}/${currentChapter?.next}`}
              passHref
            >
              <a
                className={`${
                  currentChapter?.next ? "block" : "invisible"
                } h-fit p-2 text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-md text-sm text-center shadow-md hover:!text-black cursor-pointer`}
              >
                Chương Tiếp <RightOutlined />
              </a>
            </Link>
          </div>

          <button
            className="w-[270px] mx-auto flex justify-center h-fit p-2 text-base sm:text-lg text-white bg-[#849EBF] font-medium rounded-md text-center shadow-2xl hover:translate-y-[-5%] transition delay-75 cursor-pointer mt-4"
            onClick={handleErrorNotification}
          >
            Báo lỗi chương
          </button>

          {(storyDetail?.slug === "nu-phu-phao-hoi-luon-doi-treo-co-full" ||
            storyDetail?.slug ===
              "thien-kim-that-tro-ve-ong-xa-toi-la-ac-ma-ao-trang" ||
            storyDetail?.slug === "nguoi-yeu-online-la-anh-de" ||
            storyDetail?.slug ===
              "thap-nien-70-mang-theo-khong-gian-ga-cho-chang-quan-nhan-mat-lanh-1" ||
            storyDetail?.slug ===
              "xuyen-thanh-nu-chinh-phan-cong-bay-nam-chinh-dien-loan" ||
            storyDetail?.slug ===
              "tan-the-thien-tai-ta-mang-theo-khong-gian-trong-trot") && (
            <div
              className="flex justify-center my-5 cursor-pointer"
              onClick={handlePremiumBannerClick}
            >
              <Image
                width={400}
                height={533}
                className="aspect-[3/4]"
                src="/images/pre-banner.png"
                loader={imageLoader}
              />
            </div>
          )}

          <div className="border-1 p-3 rounded-2xl space-y-4 mx-2 mt-4">
            <TopTrendingTitle />
            <HotStories
              className="grid grid-cols-3 sm:grid-cols-4 justify-center gap-x-3 gap-y-5"
              data={topTrending?.data}
            />
            <div className="flex">
              <ButtonViewAll
                className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
                url="/danh-sach-truyen/trending"
                title="Xem thêm danh sách truyện HOT"
              />
            </div>
          </div>

          <div className="border-1 p-3 rounded-2xl space-y-4 mx-2 sm:mt-4">
            <TopNewTitle />
            <HotStories
              className="grid grid-cols-3  sm:grid-cols-4 justify-center gap-x-2 gap-y-5"
              data={topNew?.data}
            />
            <div className="flex">
              <ButtonViewAll
                className="w-full border-1 text-[#5C95C6] bg-[#F5F8FF] font-medium rounded-lg text-base px-5 py-2.5 text-center shadow-sm hover:bg-[#5C95C6] hover:transition hover:delay-50 hover:!text-white cursor-pointer"
                url="/danh-sach-truyen/moi-nhat"
                title="Xem thêm danh sách truyện mới ra"
              />
            </div>
          </div>
        </div>

        {showChapter && (
          <Chapters
            setShowChapter={setShowChapter}
            story={storyDetail}
            currentChapter={currentChapter}
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
            handleClose={(e) => setShowModalNotEnoughDiamond(false)}
            styleBody="background-gradient-gray"
          >
            <div className="h-[250px]">
              <p
                className="mt-[50px] px-[20px]"
                dangerouslySetInnerHTML={{
                  __html: `Hiện bạn có tổng <strong><span style='color:rgb(212, 39, 4); font-size: 20px'>${availableCash?.balance}</span></strong> kim cương, không đủ để mở chương này. Bạn hãy nạp thêm nhé`,
                }}
              />
              <p
                className="px-[20px]"
                dangerouslySetInnerHTML={{
                  __html: `Mở toàn bộ truyện này hết tổng <strong><span style='color:rgb(212, 39, 4); font-size: 20px'>${formatStringToNumber(
                    fullPriceStory?.remained
                  )}</span></strong> kim cương.`,
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
                  href={`/nap-kim-cuong?ref=${GlobalStore.profile?.referralCode}`}
                  passHref
                >
                  <a className="button-deposit-diamond">Nạp kim cương</a>
                </Link>
              </div>
            </div>
          </ModalComponent>
        )}
        {showQuestion && (
          <ModalWithoutCloseButton
            show={showQuestion}
            handleClose={(e) => setShowQuestion(false)}
            styleBody="background-gradient-gray"
          >
            <Question
              question={question}
              closeModal={() => setShowQuestion(false)}
            />
          </ModalWithoutCloseButton>
        )}
      </div>
      {showDepositSuccessWarning && (
        <ModalComponent
          show={showDepositSuccessWarning}
          handleClose={(e) => setShowDepositSuccessWarning(false)}
          styleBody="background-gradient-gray"
        >
          <div className="px-[20px] pb-[20px] pt-[10px]">
            <div className="flex justify-center pb-[15px]">
              <img
                src="/images/info-icon.png"
                className="w-[20px] h-[20px] mr-[5px]"
              />
              <p>
                <strong>Lưu ý</strong>
              </p>
            </div>
            <div className="px-[10px]">
              <p>
                Bạn nhớ gửi kèm theo ảnh chuyển khoản thành công để Admin phê
                duyệt nhé!
              </p>
              <p>
                Sau khi Admin nạp kim cương, bạn chỉ cần mở khoá chương là đọc
                được tiếp.
              </p>
              <a
                className="btnMain"
                onClick={() => handleOKWarningDepositSuccess()}
              >
                OK
              </a>
            </div>
          </div>
        </ModalComponent>
      )}
      {/*<MobileShare showBubble={showBubble} setShowBubble={setShowBubble}/>*/}
      {/*<ChatSupportAutoClose/>*/}

      <Modal
        title={
          <div>
            <div className="text-lg">Danh sách chương</div>
            <div className="flex w-full justify-between">
              <div className="text-sm self-center">Sắp xếp</div>
              <div className="flex gap-x-2">
                <a
                  className={`h-fit p-2 text-black font-medium rounded-md text-sm text-center shadow-md cursor-pointer focus:shadow-none ${
                    filter === "oldest"
                      ? "bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700"
                      : "bg-slate-100"
                  }`}
                  onClick={() => handleFilterChange("oldest")}
                >
                  Cũ nhất
                </a>
                <a
                  className={`h-fit p-2 text-black font-medium rounded-md text-sm text-center shadow-md cursor-pointer ${
                    filter === "newest"
                      ? "bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700"
                      : "bg-slate-100"
                  }`}
                  onClick={() => handleFilterChange("newest")}
                >
                  Mới nhất
                </a>
              </div>
            </div>
          </div>
        }
        cancelText="Đóng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
          </>
        )}
      >
        <div className="max-h-[500px] overflow-y-auto p-2">
          <Table
            pagination={false}
            size="small"
            showHeader={false}
            bordered
            dataSource={
              filter === "oldest"
                ? storyDetail?.chapters
                : [...(storyDetail?.chapters || [])].reverse()
            }
            columns={storyChapterColumns}
            rowClassName="hover:bg-gray-100 cursor-pointer"
            rowKey="slug"
            onRow={() => ({
              onClick: () => handleCancel(),
            })}
          />
        </div>
      </Modal>
      <Spin spinning={loadingChapterDetail} />
    </>
  );
};

export default observer(StoryDetail);
