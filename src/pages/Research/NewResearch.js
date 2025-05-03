import React, { useEffect, useState } from "react";
import ModalComponent from "../../components/Modal/Modal";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import StoryStore from "../../stores/StoryStore";
import Search from "../Search/Search";
import ChatSupport from "../../components/Button/ChatSupport";
import { setItem, getItem } from "../../utils/storage";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import RatingList from "../../components/RatingList";
import GlobalStore from "../../stores/GlobalStore";
import HashtagSection from "./HashtagSection";
import UnfinishedStory from "../../components/UnfinishedStory";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import HeadMenu from "./HeadMenu";

let timeout;

const Research = () => {
  const [text, setText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setText(router.query.tukhoa || "");
  }, [router.query.tukhoa]);

  const {
    categories,
    getCategories,

    favouriteCategories,
    getFavouriteCategories,

    topTrending,
    getTopTrending,

    topViews,
    getTopViews,

    hotStories,
    getHotStories,

    topNew,
    getTopNew,

    topFull,
    getTopFull,

    viewings,
    getStoryViewings,

    ratings,
    getRatings,

    hashtags,
    getHashtags,

    // getcollections1,
    // collections1,

    // getcollections2,
    // collections2,

    // saveCustomerClickBanner,

    // checkCustomerClickAff,

    // recordClickAff,
  } = StoryStore;

  const { isLoggedIn, checkIsLogin } = GlobalStore;

  useEffect(() => {
    if (isLoggedIn) {
      getStoryViewings();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const checkCustomerClickAffLocal = async () => {
      // const isClickAff = await checkCustomerClickAff(localStorage.getItem('DEVICE_ID'))
      // if (!isClickAff) {
      //   setShowModal(true)
      // }
      const isShowBanner = await shouldShowBanner();
      if (isShowBanner) {
        setShowModal(true);
      }
    };

    checkIsLogin();
    getCategories();
    getFavouriteCategories();
    getTopTrending();
    getHotStories();
    getTopViews();
    getTopNew();
    getTopFull();
    getRatings(0, 4);
    getHashtags(1, 40);
    // getcollections1();
    // getcollections2();
    // setShowModal(true);
    // checkCustomerClickAffLocal();
  }, []);

  // useEffect(() => {
  //   if (favouriteCategories && favouriteCategories?.length > 0) {
  //     setSelectedCategory(favouriteCategories[0].categoryCode);
  //   }
  // }, [favouriteCategories]);

  const shouldShowBanner = async () => {
    const lastClosed = await getItem("bannerClosedAt");
    if (!lastClosed) return true;

    const today = new Date().toISOString().split("T")[0];
    return lastClosed !== today;
  };

  // Hàm lưu trạng thái đóng banner
  const closeBanner = async () => {
    const today = new Date().toISOString().split("T")[0];
    await setItem("bannerClosedAt", today);
    setShowModal(false);
  };

  const handleClick = async (e, code) => {
    // saveCustomerClickBanner(code)
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'RESEARCH')
    await closeBanner();
    if (code === "tai-app-research") {
      window.open("https://toidoc.onelink.me/59bO/d42503wz");
    } else {
      window.open(
        `https://www.facebook.com/groups/congdongdoctoidoc/posts/674053792015086/`,
        "_blank",
        "Toidoc"
      );
    }
  };

  const handleCloseModal = async (code) => {
    // recordClickAff(localStorage.getItem('DEVICE_ID'), 'RESEARCH')
    // window.open(`https://shope.ee/2q75o9ztbC`, '_blank', 'Toidoc')
    if (code === "aff") {
      await closeBanner();
    }
    // setShowModal(false)
  };

  return (
    <>
      <div>
        <Header selectedTab={"RESEARCH"} />
        <h1 style={{display: 'none'}}>Top truyện full hoàn, mới ra lò, truyện mới nổi được cập nhật nhanh nhất</h1>
        <div className="max-w-[1116px] mx-auto bg-white pt-10 md:pt-[88px] px-0 md:px-2 space-y-10 pb-20">
          <div className="pt-2 mt-0 fixed top-0 left-0 right-0 bg-white md:hidden z-50 flex justify-center">
            <div className="pb-2 border-b-[1px] border-color flex gap-x-2">
              <div className="relative float-left">
                <input
                  className="search border-primary border-width-1 input-search"
                  placeholder="Tìm kiếm truyện..."
                  value={text}
                  onChange={(e) => {
                    const value = e.target.value;
                    setText(value);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                      Router.replace(`/tim-kiem?tukhoa=${value}`);
                    }, 600);
                  }}
                  onFocus={() => {
                    setShowSearch(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSearch(false);
                    }, 1000);
                  }}
                />
                <img
                  src="/images/search.svg"
                  className="search-icon"
                  alt="Tìm kiếm truyện full"
                  title="Tìm kiếm truyện full"
                />
              </div>
              <a
                className="w-[109px] h-[45px] flex items-center justify-center rounded-full download-btn text-white pr-2.5"
                onClick={(e) => handleClick(e, "tai-app-research")}
              >
                <img
                  src="/images/download-arrow.png"
                  className="w-6"
                  alt="Góp ý truyện fulll"
                  title="Góp ý truyện full"
                />
                Tải app
              </a>
            </div>
          </div>

          {text ? (
            <div className="mb-5 md:pt-0">
              <Search hiddenSearch={true} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="block md:hidden">
                <HeadMenu />
              </div>
              <div className="space-y-2 mx-2">
                {(isLoggedIn && viewings?.data?.length > 0) && (
                  <div className="block md:hidden py-3 md:mt-0 px-2 space-y-2 bg-slate-100 rounded-xl">
                    <UnfinishedStory
                      items={[
                        {
                          unfinishedStory: {
                            readingPercent: viewings?.data?.[0]?.readingPercent,
                            title: viewings?.data?.[0]?.story?.title,
                            coverImage:
                              viewings?.data?.[0]?.story?.thumbnail ||
                              viewings?.data?.[0]?.story?.coverImage,
                            currentChapterOrder:
                              viewings?.data?.[0]?.currentChapterOrder,
                            storySlug: viewings?.data?.[0]?.storySlug,
                            chapterSlug: viewings?.data?.[0]?.chapterSlug,
                          },
                        },
                      ]}
                    />

                    <div className="flex">
                      <Link
                        href={`${viewings?.data?.[0]?.storySlug}/${viewings?.data?.[0]?.chapterSlug}`}
                        title={viewings?.data?.[0]?.story?.title}
                        passHref
                      >
                        <a className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center shadow-md hover:!text-black cursor-pointer">
                          Đọc tiếp <ArrowRightOutlined />
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="block md:hidden">
                <Section3 topTrending={topTrending} />
              </div>

              <Section1 viewings={viewings} categories={categories} />

              <Section2 topNew={topNew} ratings={ratings} />

              <div className="hidden md:block">
                <Section3 topTrending={topTrending} />
              </div>

              <div className="block md:hidden bg-[#F5F8FF] px-2 py-4 rounded-xl mx-2">
                <RatingList ratings={ratings} />
              </div>

              <HashtagSection hashtags={hashtags} />

              <Section5 topViews={topViews} />

              <Section4 topFull={topFull} />
            </div>
          )}
        </div>

        {showModal && <ModalComponent
          show={showModal}
          handleClose={(e) => handleCloseModal('aff')}
          isCountDown={false}
          countDownTime={5}
        >
          <a onClick={(e) => handleClick(e, 'big-banner-research')}>
            <img src="https://media.truyenso1.xyz/ads/flash-sale-3-5.png" className='imgBanner'/>
          </a>
        </ModalComponent>}
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />
    </>
  );
};

export default observer(Research);
