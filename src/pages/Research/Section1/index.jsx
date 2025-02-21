import { useEffect } from "react";
import DownloadArea from "../../../components/DownloadArea";
import HotCategories from "../../../components/HotCategories";
import UnfinishedStory from "../../../components/UnfinishedStory";
import GlobalStore from "../../../stores/GlobalStore";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

const Section1 = ({ viewings, categories }) => {
  const { isLoggedIn, checkIsLogin } = GlobalStore;

  useEffect(() => {
    checkIsLogin();
  }, [isLoggedIn]);

  return (
    <div className="px-2 sm:grid sm:grid-flow-col sm:grid-cols-12 gap-x-4">
      <div className="hidden sm:block sm:order-2 sm:col-span-5 md:col-span-4 bg-slate-100 space-y-4 pb-4 px-2 rounded-xl h-fit pt-4 mt-4 ">
        {(isLoggedIn && viewings?.data?.length > 0) && (
          <div className="text-lg text-black font-bold">Danh sách đang đọc</div>
        )}
        {(isLoggedIn && viewings?.data?.length > 0) && (
          <div className="space-y-4">
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
        <DownloadArea />
      </div>
      <div className="sm:order-1 sm:col-span-7 md:col-span-8">
        <HotCategories data={categories} />
      </div>
    </div>
  );
};

export default Section1;
