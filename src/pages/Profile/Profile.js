import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import * as Api from "../../api/api";
import Router from "next/router";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import GlobalStore from "../../stores/GlobalStore";
import { removeToken } from "../../utils/storage";
import StoryStore from "../../stores/StoryStore";
import ProfileStore from "../../stores/ProfileStore";
import StoryItem from "../../components/StoryItem/StoryItem";
import { formatStringToNumber } from "../../utils/utils";
import CopyButton from "../../components/CopyButton/CopyButton";
import Link from "next/link";

const Profile = () => {
  const {
    bookmark,
    getBookMark,
    viewings,
    getStoryViewings,
    history,
    getStoryHistory,
  } = StoryStore;

  const { balance, getBalance } = ProfileStore;

  const [selfProfile, setSelfProfile] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await GlobalStore.checkIsLogin();
      if (!isLoggedIn) {
        Router.push("/dang-nhap");
      }
      if (isLoggedIn) {
        await getStoryViewings();
        await getStoryHistory();
        await getBalance();
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelfProfile(GlobalStore.profile);
  }, [GlobalStore.isLoggedIn]);

  const handleLogout = async () => {
    try {
      await Api.deleteData({ url: "/customer/customer/logout" });
      removeToken();
      GlobalStore.profile = {};
      GlobalStore.isLoggedIn = false;
      Router.push("/tim-kiem");
    } catch (e) {
      console.log("Error call logout: ", e);
    }
  };

  const renderContent = () => {
    if (isLoading) return <p>Loading...</p>;
    if (activeTab === 0 && viewings?.data?.length <= 0)
      return <p>Hiện tại bạn chưa lưu lịch sử đọc truyện...</p>;
    if (activeTab === 1 && history?.data?.length <= 0)
      return <p>Hiện tại bạn chưa lưu lịch sử đọc truyện...</p>;

    return (
      <ul>
        {(activeTab === 0 ? viewings?.data : history?.data)?.map(
          (item, index) => (
            <div className="flex border-b border-gray-200 mb-2" key={index}>
              <StoryItem item={item?.story} direction="row" fromSearch={true} />
            </div>
          )
        )}
      </ul>
    );
  };

  const renderDiamond = () => {
    return balance?.map((item, i) => (
      <div key={i} className="mr-5 text-center space-y-1">
        <div className="flex items-center">
          <div className="mr-1">{item?.denomination?.name}</div>
          <img src={item?.denomination?.icon} className="w-5" />
        </div>
        <p className="font-bold">{formatStringToNumber(item?.balance)}</p>
      </div>
    ));
  };

  return (
    <CommonLayout>
      <div>
        <Header selectedTab={"PROFILE"} />
        <div className="relative pb-24 max-w-[768px] mx-auto bg-white min-h-screen px-2 md:pt-24">
          <div className="flex justify-center mt-4">
            <div className="flex gap-x-4">
              <img
                src={GlobalStore.profile?.avatar || selfProfile?.avatar}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <p className="font-bold text-lg mb-0">
                  {GlobalStore.profile?.displayName || selfProfile?.displayName}
                </p>
                <div className="flex items-center mt-1">
                  <p className="font-bold text-lg">
                    (
                    {GlobalStore.profile?.referralCode ||
                      selfProfile?.referralCode}
                    )
                  </p>
                  <CopyButton
                    text={
                      GlobalStore.profile?.referralCode ||
                      selfProfile?.referralCode
                    }
                  />
                </div>
                <p className="mt-1 account-title">
                  {GlobalStore.profile?.authorDate
                    ? "Tác giả"
                    : GlobalStore.profile?.translatorDate
                    ? "Dịch giả"
                    : "Độc giả"}
                </p>
                <div
                  className="flex items-center mt-1 text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <span>Đăng xuất</span>
                  <img src="/images/logout.png" className="w-7 ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            {renderDiamond()}
          </div>
          <div className="flex justify-center">
            <Link
              href={`/nap-kim-cuong?ref=${GlobalStore.profile?.referralCode}`}
            >
              <a id="nap-kim-cuong" class="relative border-0 bg-transparent p-0 mt-4 cursor-pointer outline-none focus:outline-none select-none touch-manipulation transition-filter duration-250 group">
                <span class="absolute top-0 left-0 w-full h-full rounded-xl bg-black/25 will-change-transform translate-y-[2px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]"></span>
                <span class="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(340deg_100%_16%)] via-[hsl(340deg_100%_32%)] to-[hsl(340deg_100%_16%)]"></span>
                <span class="block relative px-[27px] py-[12px] rounded-xl text-white bg-[hsl(345deg_100%_47%)] will-change-transform translate-y-[-4px] transition-transform duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-[-6px] group-active:translate-y-[-2px] text-[1.1rem]">
                  Nạp kim cương
                </span>
              </a>
            </Link>
          </div>
          <div className="flex my-4 justify-center border-b">
            <button
              onClick={() => setActiveTab(0)}
              className={`py-2 px-5 font-semibold ${
                activeTab === 0
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-black"
              }`}
            >
              DS Đang Đọc
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`py-2 px-5 font-semibold ${
                activeTab === 1
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-black"
              }`}
            >
              DS Đọc Xong
            </button>
          </div>
          <div className="bg-white pb-20">{renderContent()}</div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Profile;
