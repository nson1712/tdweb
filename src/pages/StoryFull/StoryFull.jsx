import React, { useEffect } from "react";
import StoryItem from "../../components/StoryItem/StoryItem";
import { formatStringToNumber } from "../../utils/utils";
import Router from "next/router";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import Image from "next/image";
import imageLoader from "../../loader/imageLoader";

const StoryFull = () => {
  const { topFull, getTopFull } = StoryStore;

  useEffect(() => {
    getTopFull();
  }, []);

  console.log("TOP FULL: ", topFull.data);

  return (
    <CommonLayout>
      <div>
        <Header />
        <div className="max-w-[768px] mx-[auto] md:pt-[80px] md:bg-white pb-64">
          <div className="flex items-center justify-between fixed md:static top-0 left-0 right-0">
            <a
              className="p-[20px]"
              onClick={() => {
                Router.back();
              }}
            >
              <img src="/images/arrow-left.svg" className="w-[24px]" />
            </a>

            <h1 className="text-[16px] leading-[20px] font-bold main-text mb-0">
              truyện đã hoàn thành
            </h1>

            <div className="w-[68px]" />
          </div>

          <div className="px-[16px] pt-[64px] md:pt-0 sm:grid sm:grid-cols-2 sm:gap-3">
            {topFull.data?.map(
              (item) => (
                console.log("ITEM: ", item),
                (
                  <div
                    className="max-w-[60] max-h-[100] py-[16px] border-b-[1px] border-color cursor-pointer flex gap-x-2"
                    key={item.code}
                    // onClick={() => {
                    //   Router.push(`/the-loai/${item.code}`)
                    // }}
                  >
                    {(item.thumbnail || item.coverImage) && (
                      <div className="max-w-[40px] max-h-16 flex">
                        <Image
                        className="rounded-e-[5px] rounded-tl-[20px] rounded-bl-[5px]"
                        loader={imageLoader}
                        src={item.thumbnail || item.coverImage}
                        width={70}
                        height={100}
                      />
                      </div>
                    )}
                    <div>
                      <a
                        className="text-[16px] leading-[16px] font-semibold mb-[8px] main-text"
                        // href={`/the-loai/${item.code}`}
                        // title={`Truyện ${item.title}`}
                      >
                        {item.title}
                      </a>
                      {/* <p className="text-[14px] mb-0 label-text">
                        {formatStringToNumber(item.totalStory)} truyện
                      </p> */}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default observer(StoryFull);
