import { RightOutlined } from "@ant-design/icons";
import { calculateCreatedTime } from "../utils/utils";
import Link from "next/link";
import { useState } from "react";

export const useTableOptions = () => {
  const newStoryColumns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (_, record) => (
        <div>
          <Link href={`/${record?.slug}`} passHref>
            <a title={`${record.title} - ${record?.latestChapter?.title}`}>
              <div className="text-black font-bold cursor-pointer hover:!text-blue-500">
                <RightOutlined /> {record.title}
              </div>
              {record?.latestChapter?.title && (
                <div
                  title={record.latestChapter.title}
                  className="hover:!text-black text-black"
                >{`(${record.latestChapter.title})`}</div>
              )}
            </a>
          </Link>
        </div>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "categories",
      key: "categories",
      width: "25%",
      responsive: ["sm"],
      render: (item) => (
        <div className="line-clamp-1 text-gray-500 font-medium cursor-pointer">
          {item?.join(", ")}
        </div>
      ),
    },
    {
      title: "Ngày ra",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (item) => (
        <div className="line-clamp-1 text-gray-500 font-medium cursor-pointer">
          {calculateCreatedTime(item)}
        </div>
      ),
    },
  ];

  return {
    newStoryColumns,
  };
};

export const useStoryChapterTableOptions = () => {
  const storyChapterColumns = [
    {
      title: "Tên truyện",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Link href={`/${record.storySlug}/${record.slug}`} passHref>
          <a
            title={record.title}
            className="text-black font-bold line-clamp-1 cursor-pointer hover:!text-blue-500"
          >
            <img
              src={record?.isFree ? "/images/Done.png" : "/images/lock.png"}
              class="w-5 float-left mr-[5px]"
            />{" "}
            {record.title}
          </a>
        </Link>
      ),
    },
  ];

  return {
    storyChapterColumns,
  };
};
