import React, { useEffect, useState } from "react";
import classNames from "classnames";
import SlideStories from "../../components/SlideStories/SlideStories";
import ModalComponent from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import StoryStore from "../../stores/StoryStore";
import GlobalStore from "../../stores/GlobalStore";
import Search from "../Search/Search";
import CollectionItem from "./CollectionItem";
import SlideCollections from "./SlideCollections";
import ChatSupport from "../../components/Button/ChatSupport";
import { setItem, getItem } from "../../utils/storage";

let timeout;

const tags = [
  "#Hashtag1",
  "#Hashtag1",
  "#Hashtag1",
  "#Hashtag1",
  "#Hashtag1",
  "#Hashtag1",
];

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
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

    getcollections1,
    collections1,

    getcollections2,
    collections2,

    saveCustomerClickBanner,

    checkCustomerClickAff,

    recordClickAff,
  } = StoryStore;

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

    const checkLogin = async () => {
      try {
        await GlobalStore.checkIsLogin();
      } catch (e) {}
    };

    checkLogin();
    getCategories();
    getFavouriteCategories();
    getTopTrending();
    getHotStories();
    getTopViews();
    getTopNew();
    getTopFull();
    getcollections1();
    getcollections2();
    // setShowModal(true)
    // checkCustomerClickAffLocal();
  }, []);

  useEffect(() => {
    if (favouriteCategories && favouriteCategories?.length > 0) {
      setSelectedCategory(favouriteCategories[0].categoryCode);
    }
  }, [favouriteCategories]);

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
        `https://www.facebook.com/toidoc.support/posts/pfbid02FE94wAvXZLq3cAVT3TSppkFLM8uabRcJ8AwMuHa9LYdbCFM7TfnpqW1crVnadNPel`,
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
        <div className="relative pb-[100px] max-w-[768px] mx-auto bg-white md:pt-[88px] px-0 md:px-[8px]">
          <div className="px-[16px] pt-[16px] mt-0 fixed top-0 left-0 right-0 bg-white md:hidden z-[9]">
            <div className="pb-[16px] mb-[0] border-b-[1px] border-color relative">
              <div className="relative float-left mr-[10px]">
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
                className="w-[109px] h-[45px] flex items-center justify-center rounded-full download-btn text-white pr-[10px]"
                onClick={(e) => handleClick(e, "tai-app-research")}
              >
                <img
                  src="/images/download-arrow.png"
                  className="w-[24px]"
                  alt="Góp ý truyện fulll"
                  title="Góp ý truyện full"
                />
                Tải app
              </a>
            </div>
          </div>

          {text || showSearch ? (
            <div className="mb-[20px] pt-[20px] md:pt-0">
              <Search hiddenSearch={true} />
            </div>
          ) : (
            <>
              <div className="mb-[20px] pt-[100px] md:pt-0">
                {/* <h1 className='text-[16px] font-bold label-text mb-[10px] px-[20px]'>
              Khám phá các thể loại
            </h1> */}
                <div className="mb-[20px]">
                  <div className="mx-auto flex items-center flex-wrap px-[16px] mb-[34px]">
                    {categories?.slice(0, 5)?.map((category) => (
                      <a
                        className={classNames(
                          `py-[11px] px-[16px] flex items-center justify-center text-[14px] main-text font-medium rounded-[24px] bg-primary2 m-[4px] research-category bg-${category.code}`
                        )}
                        key={category.code}
                        // onClick={() => {
                        //   Router.push(`/the-loai/${category.code}`)
                        // }}
                        href={`/the-loai/${category.code}`}
                        title={`Thể loại truyện ${category.name}`}
                      >
                        {category.name}
                      </a>
                    ))}
                    <a
                      className={classNames(
                        "py-[11px] px-[16px] flex items-center justify-center text-[14px] main-text font-medium rounded-[24px] m-[4px] research-category research-category-view-all"
                      )}
                      // onClick={() => {
                      //   Router.push('/the-loai')
                      // }}
                      href="/the-loai"
                      title="Tất cả thể loại truyện full"
                    >
                      Xem tất cả
                    </a>
                  </div>
                  {collections1?.data && collections1?.data?.length > 0 && (
                    <SlideCollections collections={collections1?.data} />
                  )}
                  <SlideStories
                    title="Trending"
                    data={topTrending?.data?.slice(0, 20)}
                    url={`/danh-sach-truyen/trending`}
                  />
                </div>

                <SlideStories
                  title="Truyen HOT Toidoc"
                  data={hotStories?.data?.slice(0, 20)}
                  url={`/danh-sach-truyen/hot`}
                />
              </div>

              {/* <div className='flex scoll-horizonal pl-[16px]'>
            {favouriteCategories?.map((category, i) => (
              <div className={classNames(' py-[8px] px-[16px] rounded-[20px] flex items-center justify-center text-[14px] leading-[20px] mr-[8px] whitespace-nowrap cursor-pointer',
                selectedCategory === category.categoryCode ? 'bg-active main-text' : 'label-text bg-primary3'
              )}
              key={category.categoryCode}
              onClick={() => {
                setSelectedCategory(category.categoryCode)
              }}
              >
                {category.categoryName}
              </div>
            )) }
          </div> */}

              {/* <div className='px-[16px]'>
            {storyByCategory[selectedCategory]?.data?.slice(0,5)?.map((item, i) => (
              <div className={classNames('py-[16px]', i !== storyByCategory[selectedCategory]?.data?.length - 1 && 'border-b-[1px] border-color')} key={item.id}>
                <StoryItem item={item}
                  direction='row'
                />
              </div>
            ))}


            <a className='btnMain mt-[8px] mb-[16px] btnSmall max-w-[338px] mx-auto'
              onClick={() => {
                Router.push(`/the-loai/${selectedCategory}`)
              }}
            >
              Xem thêm
            </a>
          </div> */}
              {/* <div className='px-[16px]'>
            <div className='mb-[16px] pt-[16px] pb-[24px] px-[16px] bg-type relative rounded-[16px] overflow-hidden'>
                <div className='bg-shadow'/>
                <div className='relative z-[2]'>
                  <p className='text-[16px] font-bold main-text text-center mb-0'>Khám phá theo thể loại</p>
                  <p className='text-[12px] secondary-text text-center mb-0'>{categories?.length} Thể loại</p>
                  <a className='btnMain mt-[16px] btnSmall max-w-[338px] mx-auto'
                    onClick={() => {
                      Router.push('/the-loai')
                    }}
                  >Xem toàn bộ danh sách</a>
                </div>
            </div>
          </div> */}

              <div className="mb-[20px]">
                <SlideStories
                  title="Nhiều lượt view nhất"
                  data={topViews?.data?.slice(0, 20)}
                  url={`/danh-sach-truyen/xem-nhieu-nhat`}
                />
              </div>

              <div className="mb-[20px]">
                <SlideStories
                  title="Truyện đã full mới nhất"
                  data={topFull?.data?.slice(0, 20)}
                  url={`/danh-sach-truyen/truyen-full`}
                />
              </div>

              <h1 className="text-[20px] font-bold main-text mb-[10px] px-[20px]">
                BST khác bạn có thể thích
              </h1>

              <div className="flex items-start flex-wrap mb-[20px]">
                {collections2?.data?.map((item) => (
                  <div className="p-[8px] w-[50%] mt-[10px]" key={item.id}>
                    <CollectionItem item={item} />
                  </div>
                ))}
              </div>

              <div className="mb-[20px]">
                <SlideStories
                  title="Danh sách truyện mới"
                  data={topNew?.data?.slice(0, 20)}
                  url={`/danh-sach-truyen/moi-nhat`}
                />
              </div>

              {/* <p className='text-[16px] leading-[20px] font-bold secondary-text mb-[16px] px-[16px]'>
            Lọc theo
          </p> */}

              {/* <div className='flex items-center justify-center flex-wrap md:mx-[-4px] px-[16px] mb-[16px]'>
            { tags.map(tag => (
              <div className='flex items-center justify-center p-[16px] bg-primary2 rounded-[24px] m-[4px] text-[14px] font-medium main-text'>
                {tag}
              </div>
            )) }
          </div> */}
            </>
          )}
        </div>

        {showModal && (
          <ModalComponent
            show={showModal}
            handleClose={(e) => handleCloseModal("aff")}
            isCountDown={false}
            countDownTime={5}
          >
            <a onClick={(e) => handleClick(e, "big-banner-research")}>
              <img
                src="https://media.truyenso1.xyz/ads/banner-lixi-tet-1.png"
                className="imgBanner"
              />
            </a>
          </ModalComponent>
        )}
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />
    </>
  );
};

export default observer(Research);
