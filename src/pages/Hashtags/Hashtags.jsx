import React, { useEffect, useState } from "react";
import Router from "next/router";
import Header from "../../components/Header/Header";
import CommonLayout from "../../layouts/CommonLayout/CommonLayout";
import { observer } from "mobx-react";
import StoryStore from "../../stores/StoryStore";
import { toJS } from "mobx";

let timeout;
const Hashtags = () => {
  const { hashtags, getHashtags } = StoryStore;
  const [page, setPage] = useState(1);

  useEffect(() => {
    getHashtags(page, 20);
  }, [page]);

  useEffect(() => {
    const trackScrolling = () => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const windowHeight =
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        const isBottom = windowBottom >= docHeight - 600;

        if (isBottom) {
          handleLoadmore();
        }
      }, 0);
    };
    window.addEventListener("scroll", trackScrolling);

    return () => {
      window.removeEventListener("scroll", trackScrolling);
    };
  }, [hashtags]);

  const handleLoadmore = () => {
    if (hashtags?.totalPages > page) {
      setPage(page + 1);
    }
  };

  return (
    <CommonLayout>
      <div>
        <Header />
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
              Hashtag
            </h1>

            <div className="w-[68px]" />
          </div>

          <div className="px-[16px] pt-[64px] md:pt-0 sm:grid sm:grid-cols-3">
            {hashtags.data?.map((item) => (
              <div
                className="py-[16px] border-b-[1px] border-color cursor-pointer flex gap-x-2"
                key={item.code}
              >
                <div>
                  <a
                    className="text-[16px] leading-[16px] font-semibold mb-[8px] text-black max-w-[150px] line-clamp-1 text-ellipsis"
                    href={`/hashtag/${item.name}`}
                    title={`#${item.name}`}
                  >
                    #{item.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default observer(Hashtags);
