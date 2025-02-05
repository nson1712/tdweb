import React from "react";
import UnfinishedStoryDetailItem from "./UnfinishedStoryDetailItem";
import GooglePlayStoreIcon from "../../../public/icons/GooglePlayStoreIcon";
import AppStoreIcon from "../../../public/icons/AppStoreIcon";
import ViewIcon from "../../../public/icons/ViewIcon";
import { Flex } from "antd";

const UnfinishedStoryItem = ({
  totalReadingStory,
  unfinishedStory,
}) => {
  return (
    <Flex vertical className="space-y-4">
      <div className="text-xl text-black font-bold pt-4">
        Danh sách đang đọc
      </div>
      <div className="rounded-[8px] bg-[#FAFAFA] px-2 flex flex-col gap-y-4 pt-3">
        <div className="flex flex-row bg-white rounded-[8px] px-4 py-2 gap-x-2">
          <ViewIcon />
          <div className="text-[#707070] text-sm font-medium self-center py-2">
            Bạn có {totalReadingStory} truyện đang đọc
          </div>
        </div>

        <UnfinishedStoryDetailItem
          completedPercent={unfinishedStory.completedPercent}
          name={unfinishedStory.name}
          thumbnail={unfinishedStory.thumbnail}
          unfinishedChapter={unfinishedStory.unfinishedChapter}
        />

        <div className="flex flex-row gap-x-2 cursor-pointer ml-3">
          <div className="flex flex-col gap-y-1 ">
            <p className="text-[#707070] text-sm leading-normal font-medium">
              Tải app và khám phá đầy đủ tính năng
            </p>
            <p className="text-black tex-sm font-bold">
              Tải xuống ngay
            </p>
          </div>
          <div>
            <div className="flex -mt-5 hover:translate-x-[5%] transition delay-75">
              <GooglePlayStoreIcon />
            </div>
            <div className="flex -mt-12 hover:translate-x-[5%] transition delay-75">
              <AppStoreIcon />
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default UnfinishedStoryItem;
