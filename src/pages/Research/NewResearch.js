import React, { useEffect, useState } from "react";
import classNames from "classnames";
import SlideStories from "../../components/SlideStories/SlideStories";
import ModalComponent from "../../components/Modal/Modal";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import Header from "../../components/Header/Header";
import { observer } from "mobx-react";
import Router, { useRouter } from "next/router";
import StoryStore from "../../stores/StoryStore";
import Search from "../Search/Search";
import CollectionItem from "./CollectionItem";
import SlideCollections from "./SlideCollections";
import ChatSupport from "../../components/Button/ChatSupport";
import { setItem, getItem } from "../../utils/storage";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

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
    <CommonLayout active="HOME">
      <div>
        <Header selectedTab={"RESEARCH"} />
        <div className="max-w-[1116px] mx-auto bg-white md:pt-[88px] px-0 md:px-[8px] space-y-6">
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

          {text ? (
            <div className="mb-[20px] pt-[20px] md:pt-0">
              <Search hiddenSearch={true} />
            </div>
          ) : (
            <>
              {/*SECTION 1*/}
              <Section1 />

              {/*SECTION 2 
              chưa xong reload data
              */}

              <Section2 />

              {/*SECTION 3*/}

              <Section3 />
              {/*SECTION 4*/}

              {/*SECTION 5*/}
            </>
          )}
        </div>

        {/* {showModal && <ModalComponent
          show={showModal}
          handleClose={(e) => handleCloseModal('aff')}
          isCountDown={false}
          countDownTime={5}
        >
          <a onClick={(e) => handleClick(e, 'big-banner-research')}>
            <img src="https://media.truyenso1.xyz/ads/banner-lixi-tet-1.png" className='imgBanner'/>
          </a>
        </ModalComponent>} */}
      </div>
      <ChatSupport showChat={showChat} setShowChat={setShowChat} />
    </CommonLayout>
  );
};

export default observer(Research);
