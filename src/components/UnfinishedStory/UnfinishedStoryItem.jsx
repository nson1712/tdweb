import React from "react";
import UnfinishedStoryDetailItem from "./UnfinishedStoryDetailItem";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import AppStoreIcon from "../../../public/icons/AppStoreIcon";
import ViewIcon from "../../../public/icons/ViewIcon";
import { Flex } from "antd";
import { getOS, handleStoreOpen } from "../../utils/utils";

const UnfinishedStoryItem = ({
  totalReadingStory,
  unfinishedStory,
}) => {

  return (
    <Flex vertical className="space-y-4">
      <div className="text-xl text-black font-bold pt-4">
        Danh sách đang đọc0
      </div>
      <div className="rounded-[8px] bg-[#FAFAFA] px-2 flex flex-col gap-y-4 pt-3">
        <div className="flex flex-row bg-white rounded-[8px] px-4 py-2 gap-x-2">
          <ViewIcon />
          <div className="text-[#707070] text-sm font-medium self-center py-2">
            Bạn có {totalReadingStory} truyện đang đọc
          </div>
        </div>

        <UnfinishedStoryDetailItem
          readingPercent={unfinishedStory.readingPercent}
          title={unfinishedStory.title}
          coverImage={unfinishedStory?.coverImage}
          currentChapterOrder={unfinishedStory.currentChapterOrder}
          storySlug={unfinishedStory.storySlug}
          chapterSlug={unfinishedStory.chapterSlug}
        />

        <div className="flex flex-row gap-x-2 cursor-pointer ml-3">
          <div className="flex flex-col gap-y-1 ">
            <p className="text-[#707070] text-sm leading-normal font-medium">
              Tải app và khám phá đầy đủ tính năng
            </p>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-base p-2.5 text-center me-2 mb-2 shadow-md"
              onClick={() => handleStoreOpen(getOS())}
            >
              Tải App Ngay
            </button>
          </div>
          <div>
            <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
              <GooglePlayStoreIcon onClick={() => handleStoreOpen("android")} />
            </div>
            <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
              <AppStoreIcon onClick={() => handleStoreOpen("ios")} />
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default UnfinishedStoryItem;
