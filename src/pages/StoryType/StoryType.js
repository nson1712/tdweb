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
import Link from "next/link";

const data = [
  {
    title: "thể loại 1",
    numberStories: 123,
    id: 1,
  },
  {
    title: "thể loại 2",
    numberStories: 133,
    id: 2,
  },
  {
    title: "thể loại 3",
    numberStories: 453,
    id: 3,
  },
  {
    title: "thể loại 4",
    numberStories: 623,
    id: 4,
  },
];

const StoryType = () => {
  const { categories, getCategories } = StoryStore;

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CommonLayout>
      <div>
        <Header selectedTab={'STORY_TYPE'}/>
        <div className="max-w-[768px] mx-[auto] md:pt-[80px] md:bg-white pb-64">
          <div className="flex items-center justify-between fixed md:static top-0 left-0 right-0 bg-white">
            <a
              className="p-[20px]"
              onClick={() => {
                Router.back();
              }}
            >
              <img src="/images/arrow-left.svg" className="w-[24px]" />
            </a>

            <h1 className="text-[16px] leading-[20px] font-bold main-text mb-0">
              Thể loại
            </h1>

            <div className="w-[68px]" />
          </div>

          <div className="px-[16px] pt-[64px] md:pt-0 grid grid-cols-2 gap-x-2">
            {categories.map((item) => (
              <div
                className="py-[16px] border-b-[1px] border-color cursor-pointer flex gap-x-2"
                key={item.code}
              >
                {(item.thumbnail || item.image) && (
                  <Image
                    loader={imageLoader}
                    src={item.thumbnail || item.image}
                    alt={item.name}
                    title={item.name}
                    width={100}
                    height={50}
                  />
                )}
                <div>
                  <Link href={`/the-loai/${item.code}`} passHref>
                    <a
                      className="text-xs sm:text-base leading-[16px] font-semibold mb-[8px] main-text"
                      title={`Truyện ${item.name}`}
                    >
                      {item.name}
                    </a>
                  </Link>
                  <p className="text-xs sm:text-[14px] mb-0 label-text">
                    {formatStringToNumber(item.totalStory)} truyện
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default observer(StoryType);
